#!/usr/bin/env bash
# Instala los skills sin sobrescribir instalaciones diferentes.
set -euo pipefail

lucha_repo_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
lucha_agent=""
lucha_project=""
lucha_dry_run=false
lucha_requested=()

lucha_usage() {
  echo 'Uso: bash install.sh --agent codex|claude [--project /ruta/existente] [--skill nombre]... [--dry-run]'
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --agent)
      [[ $# -ge 2 ]] || { lucha_usage >&2; exit 2; }
      lucha_agent="$2"; shift 2 ;;
    --project)
      [[ $# -ge 2 ]] || { lucha_usage >&2; exit 2; }
      [[ -d "$2" ]] || { echo "El proyecto no existe: $2" >&2; exit 2; }
      lucha_project="$(cd "$2" && pwd)"; shift 2 ;;
    --skill)
      [[ $# -ge 2 && -n "$2" ]] || { lucha_usage >&2; exit 2; }
      lucha_requested+=("$2"); shift 2 ;;
    --dry-run) lucha_dry_run=true; shift ;;
    -h|--help) lucha_usage; exit 0 ;;
    *) lucha_usage >&2; exit 2 ;;
  esac
done

case "$lucha_agent" in
  codex) lucha_agent_folder=".agents" ;;
  claude) lucha_agent_folder=".claude" ;;
  *) lucha_usage >&2; exit 2 ;;
esac

lucha_target_dir="${lucha_project:-$HOME}/$lucha_agent_folder/skills"
lucha_mode="link"
[[ -z "$lucha_project" ]] || lucha_mode="copy"
lucha_sources=()
lucha_names=()
while IFS= read -r -d '' lucha_manifest; do
  lucha_candidate="$(dirname "$lucha_manifest")"
  lucha_name="$(basename "$lucha_candidate")"
  if [[ ${#lucha_names[@]} -gt 0 ]]; then
    for lucha_existing_name in "${lucha_names[@]}"; do
      [[ "$lucha_existing_name" != "$lucha_name" ]] || { echo "Nombre de skill duplicado: $lucha_name" >&2; exit 1; }
    done
  fi
  lucha_names+=("$lucha_name")
  lucha_include=true
  if [[ ${#lucha_requested[@]} -gt 0 ]]; then
    lucha_include=false
    for lucha_requested_name in "${lucha_requested[@]}"; do
      [[ "$lucha_requested_name" != "$lucha_name" ]] || lucha_include=true
    done
  fi
  [[ "$lucha_include" == false ]] || lucha_sources+=("$lucha_candidate")
done < <(find "$lucha_repo_dir" -type d \( -name .git -o -name .venv \) -prune -o -type f -name SKILL.md -print0)
if [[ ${#lucha_requested[@]} -gt 0 ]]; then
  for lucha_requested_name in "${lucha_requested[@]}"; do
    lucha_found=false
    if [[ ${#lucha_names[@]} -gt 0 ]]; then
      for lucha_name in "${lucha_names[@]}"; do
        [[ "$lucha_requested_name" != "$lucha_name" ]] || lucha_found=true
      done
    fi
    [[ "$lucha_found" == true ]] || { echo "Skill desconocido: $lucha_requested_name" >&2; exit 2; }
  done
fi
[[ ${#lucha_sources[@]} -gt 0 ]] || { echo 'No hay skills de Lucha para instalar.' >&2; exit 1; }

# Revisar todas las colisiones antes de modificar el destino.
for lucha_source in "${lucha_sources[@]}"; do
  lucha_target="$lucha_target_dir/$(basename "$lucha_source")"
  if [[ "$lucha_mode" == link && -L "$lucha_target" ]] && [[ "$(readlink "$lucha_target")" == "$lucha_source" ]]; then
    continue
  fi
  if [[ "$lucha_mode" == copy && -d "$lucha_target" && ! -L "$lucha_target" ]] && diff -qr "$lucha_source" "$lucha_target" >/dev/null; then
    continue
  fi
  if [[ -e "$lucha_target" || -L "$lucha_target" ]]; then
    echo "Ya existe otra instalación en $lucha_target. No se modificó." >&2
    exit 1
  fi
done

if [[ "$lucha_dry_run" == false ]]; then
  mkdir -p "$lucha_target_dir"
fi
for lucha_source in "${lucha_sources[@]}"; do
  lucha_target="$lucha_target_dir/$(basename "$lucha_source")"
  if [[ -e "$lucha_target" || -L "$lucha_target" ]]; then
    echo "Ya instalado: $lucha_target"
  elif [[ "$lucha_dry_run" == true ]]; then
    echo "Se instalaría ($lucha_mode) $lucha_target desde $lucha_source"
  elif [[ "$lucha_mode" == copy ]]; then
    cp -R "$lucha_source" "$lucha_target"
    echo "Copiado: $lucha_target"
  else
    ln -s "$lucha_source" "$lucha_target"
    echo "Enlazado: $lucha_target -> $lucha_source"
  fi
done
