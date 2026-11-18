/* ============================================================
   LuchIA · Mapas Luchantes — MODELO DE DATOS
   Segunda lente sobre las MISMAS 15 empresas de window.PORT.
   El Mapa Luchante = evaluación 360 en 7 dimensiones:
     Propósito (corazón) · Salud · Capital · Impacto ·
     Storytelling · Equipo · Bienestar.
   Semáforo: verde ≥70 · amarillo 55–69 · rojo <55 · gris s/d.

   Todo se sintetiza de forma determinista desde hechos base que ya
   viven en PORT (salud, docs, dip, flags, condiciones) + una semilla
   por empresa, de modo que las dos lentes cuadren. Al conectar el
   portfolio.json real, reemplazar el generador por los scores y
   sub-indicadores reales del corte (mapa_por_trimestre).
   ============================================================ */
(function () {
  const PORT = window.PORT;

  // ---- semilla determinista por empresa ----
  function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function mulberry32(a) { return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  // ---- las 7 dimensiones (orden de heatmap) ----
  const DIMS = [
    { code: "Pr", key: "proposito",    name: "Propósito",   short: "Propósito",  q: "¿Para qué existe?",         center: true,  subs: ["Claridad de misión", "Alineación de equipo"] },
    { code: "Sa", key: "salud",        name: "Salud",       short: "Salud",      q: "¿El negocio respira?",      subs: ["Margen bruto", "Runway"] },
    { code: "Ca", key: "capital",      name: "Capital",     short: "Capital",    q: "¿La ronda cierra?",         subs: ["Ronda / SAFE", "Dilución founder"] },
    { code: "Im", key: "impacto",      name: "Impacto",     short: "Impacto",    q: "¿A quién cambia la vida?",  subs: ["Beneficiarios", "Profundidad"] },
    { code: "St", key: "storytelling", name: "Storytelling",short: "Story",      q: "¿Se sabe contar?",          subs: ["Narrativa / pitch", "Presencia"] },
    { code: "Eq", key: "equipo",       name: "Equipo",      short: "Equipo",     q: "¿Quién ejecuta?",           subs: ["Founder-market fit", "Retención"] },
    { code: "Bi", key: "bienestar",    name: "Bienestar",   short: "Bienestar",  q: "¿El founder está bien?",    subs: ["Saboteadores (PQ)", "Carga / burnout"] },
  ];
  const DIM_BY_KEY = Object.fromEntries(DIMS.map((d) => [d.key, d]));
  // bias por dimensión a nivel portafolio (revela debilidades sistémicas en el promedio)
  const DIM_BIAS = { proposito: 6, salud: 2, capital: -4, impacto: 3, storytelling: -2, equipo: 4, bienestar: -9 };

  // ---- base de salud → score medio del mapa ----
  const SALUD_BASE = { good: 74, watch: 62, review: 51, sd: 60 };

  // ============================================================
  //  MÉTRICAS DE LA EMPRESA (negocio + impacto) — sintéticas y
  //  deterministas. Espejo de company_business_metrics (bloque
  //  real, por indicador × periodo) y company_impact_metrics.
  //  Al conectar la DB, reemplazar buildNegocio/buildImpacto por
  //  los indicadores reales del corte.
  // ============================================================
  const BIZ_Q = ["Q1 '25", "Q2 '25", "Q3 '25", "Q4 '25", "Q1 '26"]; // 5 trimestres

  // banco de indicadores de impacto por sector (todos categoría 'output')
  //  [nombre, unidad, magnitud base]
  const IMPACT_BANK = {
    "Green Zebra": [["Tn de CO₂ evitadas", " tn", 180], ["MWh de energía limpia", " MWh", 30], ["Hectáreas gestionadas", " ha", 120], ["Litros de agua ahorrados", " L", 92000], ["Kg de residuos valorizados", " kg", 5400]],
    "Access Tech": [["Personas con acceso", " pers.", 4200], ["Empleos creados", "", 24], ["Comunidades atendidas", "", 8], ["% primer acceso formal", " %", 38], ["Trayectos asistidos", "", 61000]],
    "Climate Tech": [["Tn de GEI evitadas", " tn", 260], ["MWh renovables", " MWh", 52], ["Ha de bosque protegidas", " ha", 340], ["Tn de residuos reciclados", " tn", 90]],
  };

  function buildNegocio(e, rnd, base) {
    const gm0 = clamp(Math.round(34 + base * 0.22), 30, 52);
    const grossMargin = BIZ_Q.map((_, i) => clamp(gm0 + Math.round(i * (2 + rnd() * 1.4)), 30, 72));
    const hc0 = Math.round(4 + base / 14);
    let hc = hc0; const headcount = BIZ_Q.map((_, i) => { if (i) hc += Math.round(rnd() * 0.9); return hc; });
    const burn = Math.round(12 + (100 - base) / 5 + rnd() * 6);   // $K / mes
    const runway = BIZ_Q.map((_, i) => clamp(Math.round(5 + base / 14 + (rnd() - 0.45) * 2 + (i === 3 ? rnd() * 2 : 0)), 2, 16));
    const cash = runway.map((r) => Math.round(r * burn));          // $K
    const snapshot = {
      yoy: Math.round(40 + base * 1.4 + rnd() * 60),
      nrr: Math.round(96 + base * 0.18 + rnd() * 14),
      ebitda: Math.round(-45 + base * 0.55 + rnd() * 18),
      sga: Math.round(60 - base * 0.28 + rnd() * 14),
      pq: +(5 + base / 22 + rnd() * 1.4).toFixed(1),
    };
    // variantes de gross margin por línea de producto (solo en algunas empresas)
    const variants = rnd() > 0.5
      ? [{ name: "línea principal", v: clamp(grossMargin[4] + Math.round(2 + rnd() * 5), 30, 80) },
         { name: "línea secundaria", v: clamp(grossMargin[4] - Math.round(4 + rnd() * 7), 18, 70) }]
      : null;
    return { lab: BIZ_Q, cash, runway, grossMargin, headcount, burn, snapshot, variants };
  }

  function buildImpacto(e, rnd, base) {
    const bank = IMPACT_BANK[e.sector] || IMPACT_BANK["Access Tech"];
    const foco = e.sector === "Access Tech" ? "social" : e.sector === "Green Zebra" ? "ambos" : "ambiental";
    const founders = 20 + Math.floor(rnd() * 5) * 10;            // 20..60 %
    const items = bank.map((b, idx) => {
      const [name, unit, mag] = b;
      const isPct = unit.trim() === "%";
      const start = Math.round(mag * (0.85 + rnd() * 0.3));
      const grow = 0.05 + rnd() * 0.22;
      const snap = idx >= 3 || (idx === 2 && rnd() > 0.65);       // algunos = 1 punto (sin serie)
      const len = snap ? 1 : 5;
      const serie = Array.from({ length: len }, (_, i) => {
        let v = start * Math.pow(1 + grow, i) * (0.96 + rnd() * 0.08);
        return isPct ? clamp(Math.round(v), 0, 100) : Math.round(v);
      });
      return { name, unit, serie };
    });
    return { foco, founders, items };
  }

  // ---- geografía: país/ciudad/coords por empresa (ilustrativa, no corresponde a la ubicación real de cada empresa) ----
  const GEO = {
    ruta:      { pais: "México",    city: "CDMX",        lat: 19.43,  lng: -99.13 },
    raiz:      { pais: "Brasil",    city: "São Paulo",   lat: -23.55, lng: -46.63 },
    hogar:     { pais: "Perú",      city: "Lima",        lat: -12.00, lng: -77.10 },
    grafito:   { pais: "México",    city: "Guadalajara", lat: 20.67,  lng: -103.35 },
    chispa:    { pais: "Perú",      city: "Arequipa",    lat: -16.41, lng: -71.54 },
    rondacircular: { pais: "Ecuador",   city: "Quito",       lat: -0.18,  lng: -78.47 },
    faro:      { pais: "Perú",      city: "Lima",        lat: -12.15, lng: -77.00 },
    botica:    { pais: "Perú",      city: "Lima",        lat: -11.98, lng: -76.95 },
    refugio:   { pais: "Perú",      city: "Lima",        lat: -12.05, lng: -77.04 },
    pulsosalud: { pais: "Perú",      city: "Cusco",       lat: -13.53, lng: -71.97 },
    vigia:     { pais: "Perú",      city: "Lima",        lat: -12.10, lng: -76.98 },
    aulaviva:  { pais: "Colombia",  city: "Bogotá",      lat: 4.71,   lng: -74.07 },
    cometa:    { pais: "Chile",     city: "Santiago",    lat: -33.45, lng: -70.67 },
    brio:      { pais: "Colombia",  city: "Medellín",    lat: 6.24,   lng: -75.58 },
    sosten:    { pais: "Chile",     city: "Santiago",    lat: -33.40, lng: -70.60 },
  };

  // ---- empresas sin mapa en el corte (entrada reciente / en exit) ----
  const SIN_MAPA = new Set(["hogar", "brio", "sosten"]);

  const semOf = (v) => (v == null ? "x" : v >= 70 ? "g" : v >= 55 ? "y" : "r");
  const SEM_TOKEN = {
    g: { fill: "var(--semaforo-verde)",    text: "var(--semaforo-verde-text)",    soft: "var(--semaforo-verde-soft)",    label: "Verde" },
    y: { fill: "var(--semaforo-amarillo)", text: "var(--semaforo-amarillo-text)", soft: "var(--semaforo-amarillo-soft)", label: "Amarillo" },
    r: { fill: "var(--semaforo-rojo)",     text: "var(--semaforo-rojo-text)",     soft: "var(--semaforo-rojo-soft)",     label: "Rojo" },
    x: { fill: "var(--semaforo-gris)",     text: "var(--semaforo-gris-text)",     soft: "var(--semaforo-gris-soft)",     label: "Sin mapa" },
  };

  const band = (v, lo, hi) => (v >= hi ? 2 : v >= lo ? 1 : 0);
  function rawFor(subName, score, e, rnd) {
    switch (subName) {
      case "Claridad de misión":  return ["baja", "media", "alta"][band(score, 55, 70)];
      case "Alineación de equipo":return ["baja", "media", "alta"][band(score, 55, 70)];
      case "Margen bruto":        return Math.round(38 + score * 0.4) + "%";
      case "Runway":              return Math.round(3 + score / 9) + "m";
      case "Ronda / SAFE": {       const s = (e.docs && e.docs["SAFE"]) || "draft"; return ({ firmado: "firmado", completo: "ok", draft: "draft", pendiente: "pend.", sinfirma: "sin firma", vacio: "—", na: "n/a" })[s] || "draft"; }
      case "Dilución founder":    return Math.round(16 + (100 - score) * 0.18) + "%";
      case "Beneficiarios":       return Math.round(2 + score / 7) + "k";
      case "Profundidad":         return ["baja", "media", "alta"][band(score, 55, 70)];
      case "Narrativa / pitch":   return ["en obra", "sólida", "fuerte"][band(score, 55, 70)];
      case "Presencia":           return ["baja", "media", "alta"][band(score, 55, 70)];
      case "Founder-market fit":  return ["medio", "bueno", "alto"][band(score, 55, 70)];
      case "Retención":           return Math.round(72 + score * 0.22) + "%";
      case "Saboteadores (PQ)":   return ["alto", "medio", "bajo"][band(score, 55, 70)];
      case "Carga / burnout":     return ["alta", "media", "baja"][band(score, 55, 70)];
      default: return "—";
    }
  }
  const subDesc = {
    "Claridad de misión": ["Qué tan nítido es el “para qué” de la empresa.", "lectura cualitativa del equipo de evaluación"],
    "Alineación de equipo": ["Qué tan alineado está el equipo con el propósito.", "encuesta interna + lectura del Studio"],
    "Margen bruto": ["Cuánto queda tras costo directo de venta.", "del Excel Supremo · último corte"],
    "Runway": ["Meses de caja al burn actual.", "<6m = rojo · <9m = amarillo"],
    "Ronda / SAFE": ["Estado del documento core de la ronda.", "espejo del Tablero Legal"],
    "Dilución founder": ["Dilución acumulada del founder.", "menor es mejor"],
    "Beneficiarios": ["Personas alcanzadas por el producto.", "reporte de impacto de la empresa"],
    "Profundidad": ["Qué tan profundo es el cambio por beneficiario.", "marco de impacto LUCHA"],
    "Narrativa / pitch": ["Qué tan sólida es la narrativa de inversión.", "lectura del Studio"],
    "Presencia": ["Presencia en prensa / comunidad.", "menciones + redes"],
    "Founder-market fit": ["Encaje del founder con el problema.", "lectura de evaluación"],
    "Retención": ["Retención de clientes / usuarios.", "del Excel Supremo"],
    "Saboteadores (PQ)": ["Positive Intelligence: nivel de saboteadores del founder.", "Dim 08 · menor presencia = mejor"],
    "Carga / burnout": ["Carga percibida y riesgo de burnout.", "check-in del Studio · menor es mejor"],
  };

  // modo sugerido / cuadrante de decisión
  function quadrant(salud, impacto) {
    const hiH = salud >= 60, hiI = impacto >= 60;
    if (hiH && hiI) return { id: "doblar", label: "Doblar apuesta", desc: "Sana y con alto impacto." };
    if (!hiH && hiI) return { id: "sostener", label: "Sostener con el Studio", desc: "Impacto alto pero frágil — caso de sweat equity." };
    if (hiH && !hiI) return { id: "revisar", label: "Revisar tesis", desc: "Sana, sin impacto claro." };
    return { id: "triage", label: "Triage / exit", desc: "Ni salud ni impacto — decidir." };
  }

  // ---- generación por empresa ----
  const maps = {};
  PORT.empresas.forEach((e) => {
    const rnd = mulberry32(hash(e.id));
    const geo = GEO[e.id] || { pais: "—", city: "—", lat: 0, lng: 0 };
    const exposure = PORT.valorPosHoy(e, "sinCeibo") || 0;
    const base = SALUD_BASE[e.salud] || 60;
    const negocio = buildNegocio(e, rnd, base);
    const impacto = buildImpacto(e, rnd, base);
    if (SIN_MAPA.has(e.id)) {
      maps[e.id] = { id: e.id, sinMapa: true, geo, exposure, scores: null, overall: null, sem: "x", momentum: null, negocio, impacto };
      return;
    }
    const profile = DIMS.map(() => (rnd() - 0.5) * 14); // perfil propio de la empresa
    const dims = DIMS.map((d, i) => {
      let sc = clamp(Math.round(base + DIM_BIAS[d.key] + profile[i]), 32, 92);
      const subs = d.subs.map((sn) => {
        const ss = clamp(Math.round(sc + (rnd() - 0.5) * 22), 28, 95);
        return { name: sn, raw: rawFor(sn, ss, e, rnd), score: ss, sem: semOf(ss), desc: subDesc[sn] || ["", ""] };
      });
      // el score de la dimensión es coherente con sus sub-indicadores
      sc = Math.round((sc + subs.reduce((a, s) => a + s.score, 0) / subs.length) / 2);
      return { ...d, score: sc, sem: semOf(sc), subs };
    });
    const scoreByKey = Object.fromEntries(dims.map((d) => [d.key, d.score]));
    // overall: promedio con Propósito ponderado 1.5
    const w = dims.reduce((a, d) => a + d.score * (d.key === "proposito" ? 1.5 : 1), 0);
    const overall = Math.round(w / (dims.length + 0.5));
    const momentum = clamp(Math.round((e.salud === "good" ? 2 : e.salud === "review" ? -3 : 0) + (rnd() - 0.45) * 9), -7, 7);
    const quad = quadrant(scoreByKey.salud, scoreByKey.impacto);

    // bloque diagnóstico
    const strongest = [...dims].sort((a, b) => b.score - a.score)[0];
    const weakest = [...dims].sort((a, b) => a.score - b.score)[0];
    const diag = `${strongest.name} tira hacia arriba (${strongest.score}); el riesgo vive en ${weakest.name.toLowerCase()} (${weakest.score}). ${e.condiciones ? "Condición abierta: " + e.condiciones.toLowerCase() + "." : ""}`;

    // insights derivados de las dimensiones + momentum
    const insights = [
      { tag: "Fortaleza", bt: strongest.name + " sólido", bd: `${strongest.name} en ${strongest.score}/100, el motor del mapa este corte.` },
      { tag: "Riesgo", bt: weakest.name + " en la mira", bd: `${weakest.name} cae a ${weakest.score}/100 — la bandera del trimestre.` },
      { tag: "Tendencia", bt: momentum >= 0 ? "Score subiendo" : "Score cayendo", bd: `Mapa ${momentum >= 0 ? "+" : ""}${momentum} pts vs. el corte anterior.` },
    ];

    // banderas críticas desde los flags legales reales
    const banderas = (e.flags || []).map((f) => ({
      tipo: (f.area === "legal" || f.area === "exit") ? "crit" : "info",
      titulo: f.queFalta, detalle: `${PORT.RESP_BY_ID[f.area] ? PORT.RESP_BY_ID[f.area].label : f.area} · ${f.dueno}`,
    }));
    if (e.dip) banderas.unshift({ tipo: "crit", titulo: "Castigo de valuación registrado", detalle: e.dip.motivo, doc: e.dip.doc });

    // avances / focos / riesgos
    const avances = [
      { sem: scoreByKey.salud >= 65 ? "g" : "y", txt: `Margen bruto en ${rawFor("Margen bruto", scoreByKey.salud, e)} este corte.`, badge: "Excel" },
      { sem: momentum >= 0 ? "g" : "r", txt: `Mapa ${momentum >= 0 ? "mejora" : "retrocede"} ${Math.abs(momentum)} pts QoQ.`, badge: "Mapa" },
      { sem: scoreByKey.impacto >= 65 ? "g" : "y", txt: `Impacto en ${scoreByKey.impacto}/100 · ${rawFor("Beneficiarios", scoreByKey.impacto, e)} beneficiarios.`, badge: "Impacto" },
    ];
    const focos = [
      e.condiciones ? `Cerrar: ${e.condiciones}` : "Sostener tracción comercial",
      weakest.name === "Capital" ? "Cerrar la ronda en curso" : `Levantar ${weakest.name.toLowerCase()} (${weakest.score})`,
    ];
    const riesgos = [
      scoreByKey.salud < 60 ? "Caja corta si la ronda se atrasa" : "Dependencia de cliente ancla",
      scoreByKey.bienestar < 55 ? "Founder en carga alta — riesgo de burnout" : "Concentración de conocimiento en el founder",
    ];

    // transacciones críticas y metas Q (del Tablero Legal)
    const transacciones = [
      { bt: e.legal ? e.legal.split("·")[0].split("+")[0].trim() : "Documento core", det: e.semLegal === "rojo" ? "Sin firma → crítico" : "En proceso → firma", stage: e.semLegal === "rojo" ? "Pendiente" : "En proceso" },
      { bt: e.condiciones ? "Hito de stake" : "Stake completo", det: e.condiciones ? e.condiciones : "Ganado", stage: e.potPct > e.pct.sinCeibo ? "Pendiente" : "Done" },
      { bt: e.exit ? "Exit parcial" : "Próximo desembolso", det: e.exit ? "En curso" : (e.porDesembolsar > 0 ? "Tramo por liberar" : "—"), stage: e.porDesembolsar > 0 || e.exit ? "Pendiente" : "Done" },
    ];

    // método LUCHA · 7 pilares (mapea a dims)
    const PILARES = [["Negocio", "salud"], ["Capital", "capital"], ["Mercado", "storytelling"], ["Impacto", "impacto"], ["Equipo", "equipo"], ["Story", "storytelling"], ["Bienestar", "bienestar"]];
    const pilares = PILARES.map(([name, k]) => {
      const sc = scoreByKey[k];
      const status = sc >= 70 ? "Done" : sc >= 60 ? "En progreso" : sc >= 50 ? "Stuck" : "Sin iniciar";
      return { name, status };
    });

    // series de tendencia (sparklines) — derivadas de PORT donde existan
    const valSeries = e.series.val.filter((v) => v != null);
    const ganadoSeries = e.series.ganado.filter((v) => v != null);
    const n = Math.max(6, valSeries.length);
    const ventas = Array.from({ length: n }, (_, i) => Math.round((40 + i * (4 + base / 30)) * (0.9 + rnd() * 0.2)));
    const meta = ventas.map((v, i) => Math.round(v * (1.08 + i * 0.012)));
    const impactoSerie = Array.from({ length: n }, (_, i) => clamp(Math.round(scoreByKey.impacto - 14 + i * (28 / n) + (rnd() - 0.5) * 5), 20, 95));

    maps[e.id] = {
      id: e.id, sinMapa: false, geo, exposure,
      dims, scoreByKey, overall, sem: semOf(overall), momentum, quad,
      activeSecs: dims.filter((d) => d.score != null).length,
      diag, insights, banderas, avances, focos, riesgos, transacciones, pilares,
      negocio, impacto,
      trend: { ventas, meta, valuacion: valSeries, stake: ganadoSeries, impacto: impactoSerie },
    };
  });

  // ---- live feed (placeholder · cableado Notion en fase posterior) ----
  const TIPOS = { av: { dot: "var(--semaforo-verde)", label: "avance" }, ri: { dot: "var(--semaforo-rojo)", label: "riesgo" }, in: { dot: "var(--semaforo-gris)", label: "info" } };
  const feed = [
    { d: "17 Jun", emp: "Ruta",      src: "Notion · Acta", t: "ri", x: "Comité aprobó extender runway; sweat del Q sin acordar entregables." },
    { d: "16 Jun", emp: "Raíz",      src: "Noticia",       t: "av", x: "Avanza la firma del convenio SIERRA tras el down round." },
    { d: "15 Jun", emp: "Ronda Circular", src: "Notion · Acta", t: "in", x: "Due diligence de la ronda puente en curso; Side Letter en draft." },
    { d: "14 Jun", emp: "Cometa",    src: "Manual",        t: "ri", x: "Hitos del paquete EL incumplidos; stake ganado castigado a ~0." },
    { d: "12 Jun", emp: "Refugio",   src: "Notion · Acta", t: "in", x: "Ronda externa diluye; ajuste leve a la baja (no aplicado acá)." },
    { d: "11 Jun", emp: "Faro",      src: "Manual",        t: "ri", x: "Pacto Luchante y SAFE siguen sin firma." },
    { d: "10 Jun", emp: "Grafito",   src: "Noticia",       t: "av", x: "Cierra cesión de equity; hito de +2 pp en camino." },
    { d: "08 Jun", emp: "Vigía",     src: "Notion · Acta", t: "in", x: "Conversión del CLA pendiente; CAA sin firma." },
    { d: "05 Jun", emp: "Chispa",    src: "Noticia",       t: "av", x: "CADE ejercida; paquete EL completo." },
  ];

  // ---- agregados de salud (KPIs del dashboard) ----
  function healthAgg() {
    const mapped = PORT.empresas.filter((e) => !maps[e.id].sinMapa);
    const counts = { g: 0, y: 0, r: 0 };
    let sum = 0;
    mapped.forEach((e) => { const m = maps[e.id]; counts[m.sem]++; sum += m.overall; });
    return {
      total: PORT.empresas.length,
      conMapa: mapped.length,
      sinMapa: PORT.empresas.length - mapped.length,
      avg: Math.round(sum / mapped.length),
      counts,
      valorPortafolio: PORT.empresas.reduce((s, e) => s + (e.valuacion || 0), 0),
    };
  }
  // promedio por dimensión (fila inferior del heatmap)
  function dimAverages() {
    const out = {};
    DIMS.forEach((d) => {
      const vals = PORT.empresas.map((e) => (maps[e.id].sinMapa ? null : maps[e.id].scoreByKey[d.key])).filter((v) => v != null);
      out[d.key] = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
    });
    const ov = PORT.empresas.map((e) => (maps[e.id].sinMapa ? null : maps[e.id].overall)).filter((v) => v != null);
    out.overall = Math.round(ov.reduce((a, b) => a + b, 0) / ov.length);
    return out;
  }

  window.MAPA = {
    DIMS, DIM_BY_KEY, maps, feed, TIPOS, semOf, SEM_TOKEN, quadrant,
    healthAgg, dimAverages,
    get: (id) => maps[id],
    empName: (id) => (PORT.byId[id] ? PORT.byId[id].nombre : id),
  };
})();
