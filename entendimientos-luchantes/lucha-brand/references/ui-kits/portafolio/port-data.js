/* ============================================================
   LuchIA · Portafolio (Tablero Legal) — MODELO DE DATOS
   Datos realistas (placeholders) sobre la estructura real:
   15 empresas · cohorts C1–C3 · eje Q1'24 → Q2'26.

   Reglas del negocio modeladas:
   · 3 CAPAS de fondo por empresa:
       Fondo Luchante (plata de los LPs) · Fondo Lucha (sweat equity
       del estudio) · Ronda Ceibo (ángeles directos, gestionados
       pero fuera de los fondos).
   · STAKE = solo lo GANADO. Lo acordado-no-cumplido = "potencial".
   · DEFAULT sin Ceibo: la cifra base es FL + Lucha.
   · DESEMBOLSADO = cash; no incluye valorización de servicios.
   · Dilución NO aplicada (cifras de referencia).
   · Eje temporal: solo trimestres pasados, hasta Q2'26.

   La serie Q-a-Q se sintetiza de forma determinista desde hechos
   base por empresa, de modo que TODO cuadra con los agregados. Al
   conectar el portfolio.json real, reemplazar `synthSeries` por los
   valores del contrato (valuacion_por_trimestre + stake ganado/Q).
   ============================================================ */
(function () {
  // ---- eje temporal (10 trimestres, sin futuro) ----
  const QUARTERS = ["Q1 '24", "Q2 '24", "Q3 '24", "Q4 '24", "Q1 '25", "Q2 '25", "Q3 '25", "Q4 '25", "Q1 '26", "Q2 '26"];
  const NQ = QUARTERS.length;
  const ENTRY = { C1: 0, C2: 4, C3: 6 }; // trimestre de entrada por cohort

  // ---- alcances por fondo (selector principal) ----
  const SCOPES = [
    { id: "sinCeibo", short: "FL + Lucha", label: "FL + Lucha (sin Ceibo)", layers: ["fl", "lucha"] },
    { id: "total",      short: "Total LUCHA", label: "Total LUCHA (con Ceibo)", layers: ["fl", "lucha", "ceibo"] },
    { id: "fl",         short: "Solo Luchante", label: "Solo Fondo Luchante", layers: ["fl"] },
    { id: "lucha",      short: "Solo Lucha", label: "Solo Fondo Lucha", layers: ["lucha"] },
  ];
  const SCOPE_BY_ID = Object.fromEntries(SCOPES.map((s) => [s.id, s]));

  // ---- responsables (chips de pendientes) ----
  const RESPONSABLES = [
    { id: "legal",   label: "Legal",       owner: "Legal externo" },
    { id: "eval",    label: "Evaluación",  owner: "Analista financiero" },
    { id: "fin",     label: "Finanzas",    owner: "Resp. Finanzas" },
    { id: "estudio", label: "Estudio",     owner: "Operaciones·Managing Partner" },
    { id: "exit",    label: "Exit inicial", owner: "P. Cultura·P. Mercado·Finanzas" },
    { id: "deal",    label: "Deal",        owner: "por confirmar" },
  ];
  const RESP_BY_ID = Object.fromEntries(RESPONSABLES.map((r) => [r.id, r]));

  // ---- estados de documentos legales ----
  const DOC_STATES = {
    firmado:   { label: "Firmado",   sem: "verde",    glyph: "✓" },
    completo:  { label: "Completo",  sem: "verde",    glyph: "✓" },
    draft:     { label: "Draft",     sem: "amarillo", glyph: "◐" },
    pendiente: { label: "Pendiente", sem: "amarillo", glyph: "…" },
    sinfirma:  { label: "Sin firma", sem: "rojo",     glyph: "!" },
    vacio:     { label: "Vacío",     sem: "gris",     glyph: "·" },
    na:        { label: "N/A",       sem: "gris",     glyph: "–" },
  };
  const CORE_DOCS = ["Pacto Luchante", "SAFE", "CAA", "Side Letter"];

  // ---- salud operativa + semáforo legal ----
  const SALUD = {
    good:   { label: "Good",   color: "var(--semaforo-verde)",    text: "var(--semaforo-verde-text)",    soft: "var(--semaforo-verde-soft)" },
    watch:  { label: "Watch",  color: "var(--semaforo-amarillo)", text: "var(--semaforo-amarillo-text)", soft: "var(--semaforo-amarillo-soft)" },
    review: { label: "Review", color: "var(--semaforo-rojo)",     text: "var(--semaforo-rojo-text)",     soft: "var(--semaforo-rojo-soft)" },
    sd:     { label: "Sin dato", color: "var(--semaforo-gris)",   text: "var(--semaforo-gris-text)",     soft: "var(--semaforo-gris-soft)" },
  };
  const LEGAL_SEM = { verde: "var(--semaforo-verde)", amarillo: "var(--semaforo-amarillo)", rojo: "var(--semaforo-rojo)", sin: "var(--semaforo-gris)" };
  const LEGAL_LABEL = { verde: "En regla", amarillo: "Observaciones", rojo: "Crítico", sin: "Sin clasificar" };

  const COHORTE_COLOR = { C1: "var(--p-coh-1)", C2: "var(--p-coh-2)", C3: "var(--p-coh-3)" };
  const COHORTE_AÑO = { C1: "2024", C2: "2025", C3: "2025–26" };

  // ============================================================
  // HECHOS BASE por empresa (lo que sería el portfolio.json)
  //   val   = valuación ACTUAL (Q2'26), USD
  //   fl/lucha/ceibo = % del cap table por capa (GANADO hoy)
  //   pot   = % total acordado sin Ceibo SI se cumplen hitos
  //   cond  = condiciones que faltan para ganar el delta
  //   moic  = múltiplo (para derivar valuación de entrada)
  //   desemb / comprom = cash desembolsado / comprometido (FL)
  //   docs  = estado de los 4 core docs [Pacto, SAFE, CAA, SideLetter]
  //   dip   = {q, motivo} para una caída de valuación explicada
  // ============================================================
  const BASE = [
    { nombre: "Ruta",      sector: "Access Tech",  vertical: "Mobility",   etapa: "Seed",     cohorte: "C1", salud: "watch",  semLegal: "amarillo", exit: false,
      val: 5000000, fl: 6.0, lucha: 3.0, ceibo: 2.0, pot: 11.0, cond: "+2 pp · hito de ventas",  moic: 1.80, desemb: 200000, comprom: 275000,
      docs: ["firmado","firmado","completo","draft"], legal: "MOU + SAFE", dip: null },
    { nombre: "Raíz",      sector: "Green Zebra",  vertical: "Climate",    etapa: "Pre Seed", cohorte: "C1", salud: "review", semLegal: "amarillo", exit: false,
      val: 3344000, fl: 5.0, lucha: 3.0, ceibo: 0.0, pot: 10.0, cond: "+2 pp · firma convenio SIERRA", moic: 1.05, desemb: 150000, comprom: 225000,
      docs: ["draft","firmado","vacio","vacio"], legal: "Term sheet + convenio SIERRA (pendiente firma)", dip: { q: 7, motivo: "Down round: extensión a valuación plana tras hito de ventas no alcanzado.", doc: "RAI-V1" } },
    { nombre: "Hogar",     sector: "Access Tech",  vertical: "Proptech",   etapa: "—",        cohorte: "C3", salud: "sd",     semLegal: "amarillo", exit: true,
      val: 3388000, fl: 4.0, lucha: 3.0, ceibo: 1.5, pot: 8.5, cond: "+1.5 pp · CADE en curso", moic: 1.90, desemb: 112500, comprom: 112500,
      docs: ["firmado","firmado","completo","completo"], legal: "Paquete EL + CADE ejercida", dip: null },
    { nombre: "Grafito",   sector: "Access Tech",  vertical: "Ecommerce",  etapa: "Seed",     cohorte: "C2", salud: "watch",  semLegal: "amarillo", exit: false,
      val: 1950000, fl: 4.0, lucha: 3.0, ceibo: 2.0, pot: 9.0, cond: "+2 pp · cesión de equity", moic: 1.36, desemb: 88000, comprom: 120000,
      docs: ["firmado","firmado","completo","draft"], legal: "Paquete EL completo + cesión de equity", dip: null },
    { nombre: "Chispa",    sector: "Green Zebra",  vertical: "Climate",    etapa: "Pre Seed", cohorte: "C3", salud: "watch",  semLegal: "amarillo", exit: true,
      val: 1814000, fl: 4.0, lucha: 3.0, ceibo: 0.0, pot: 7.0, cond: "Stake completo ganado", moic: 3.17, desemb: 56000, comprom: 56000,
      docs: ["firmado","firmado","draft","completo"], legal: "Paquete EL + CADE", dip: null },
    { nombre: "Ronda Circular", sector: "Climate Tech", vertical: "FoodTech",   etapa: "Seed",     cohorte: "C2", salud: "sd",     semLegal: "amarillo", exit: false,
      val: 3754000, fl: 3.0, lucha: 2.0, ceibo: 1.0, pot: 8.0, cond: "+3 pp · cierre de DD + Side Letter", moic: 1.00, desemb: 162500, comprom: 262500,
      docs: ["draft","firmado","draft","draft"], legal: "SAFE + CAA + Side Letter (con DD)", dip: { q: 8, motivo: "Reestructuración: valuación plana en ronda puente mientras cierra DD.", doc: "RCI-V1" } },
    { nombre: "Faro",      sector: "Access Tech",  vertical: "Edtech",     etapa: "Seed",     cohorte: "C2", salud: "watch",  semLegal: "rojo", exit: false,
      val: 2400000, fl: 3.0, lucha: 2.0, ceibo: 2.0, pot: 6.0, cond: "+1 pp · SAFE pendiente firma", moic: 1.00, desemb: 80000, comprom: 128000,
      docs: ["sinfirma","sinfirma","vacio","vacio"], legal: "Investment Records (Pacto, SAFE) sin firmar", dip: null },
    { nombre: "Botica",    sector: "Access Tech",  vertical: "HealthTech", etapa: "Seed",     cohorte: "C3", salud: "sd",     semLegal: "sin", exit: false,
      val: 1528000, fl: 4.0, lucha: 3.0, ceibo: 0.0, pot: 9.0, cond: "+2 pp · pipeline (¿pacto?)", moic: 2.67, desemb: 40000, comprom: 64000,
      docs: ["draft","vacio","vacio","vacio"], legal: "Pacto en borrador (¿pipeline?)", dip: null },
    { nombre: "Refugio",   sector: "Climate Tech", vertical: "Biotech",    etapa: "Pre Seed", cohorte: "C2", salud: "good",   semLegal: "verde", exit: false,
      val: 1416000, fl: 4.0, lucha: 2.0, ceibo: 1.0, pot: 6.0, cond: "Stake completo ganado", moic: 0.97, desemb: 76000, comprom: 76000,
      docs: ["firmado","na","na","completo"], legal: "MOU + préstamo (deuda)", dip: { q: 9, motivo: "Castigo leve: ajuste a la baja por dilución de ronda externa (no aplicada acá).", doc: "REF-V1" } },
    { nombre: "Pulso Salud", sector: "Access Tech",  vertical: "HealthTech", etapa: "Pre Seed", cohorte: "C2", salud: "review", semLegal: "amarillo", exit: false,
      val: 2500000, fl: 3.0, lucha: 2.0, ceibo: 0.0, pot: 7.0, cond: "+2 pp · RSA + hitos", moic: 1.00, desemb: 100000, comprom: 175000,
      docs: ["firmado","firmado","draft","draft"], legal: "Paquete EL + RSA", dip: null },
    { nombre: "Vigía",     sector: "Access Tech",  vertical: "HealthTech", etapa: "Pre Seed", cohorte: "C1", salud: "watch",  semLegal: "rojo", exit: false,
      val: 2100000, fl: 3.0, lucha: 2.0, ceibo: 2.0, pot: 7.0, cond: "+2 pp · conversión CLA", moic: 1.27, desemb: 75000, comprom: 137500,
      docs: ["draft","draft","sinfirma","vacio"], legal: "CLA / MOU convertible", dip: null },
    { nombre: "Aula Viva", sector: "Access Tech",  vertical: "Edtech",     etapa: "MVP",      cohorte: "C1", salud: "good",   semLegal: "amarillo", exit: false,
      val: 640000, fl: 2.0, lucha: 1.0, ceibo: 0.0, pot: 3.0, cond: "Stake completo (en graduación)", moic: 1.05, desemb: 24000, comprom: 24000,
      docs: ["completo","na","na","na"], legal: "Solo registros corporativos (en graduación)", dip: null },
    { nombre: "Cometa",    sector: "Access Tech",  vertical: "HealthTech", etapa: "Pre Seed", cohorte: "C2", salud: "review", semLegal: "rojo", exit: false,
      val: 960000, fl: 0.0, lucha: 0.0, ceibo: 0.0, pot: 6.0, cond: "+6 pp · paquete EL sin cumplir", moic: 0.0, desemb: 32000, comprom: 96000,
      docs: ["sinfirma","sinfirma","sinfirma","vacio"], legal: "Paquete EL estándar completo (sin ejecutar)", dip: { q: 9, motivo: "Castigo a ~$0 de stake ganado: hitos del paquete EL incumplidos.", doc: "CO-V2" } },
    { nombre: "Brío",      sector: "Access Tech",  vertical: "Apparel",    etapa: "Seed",     cohorte: "C1", salud: "good",   semLegal: "amarillo", exit: true,
      val: null, fl: 0.0, lucha: 0.0, ceibo: 0.0, pot: 4.0, cond: "SPV en exit · stake vía vehículo", moic: null, desemb: 0, comprom: 0,
      docs: ["completo","na","na","completo"], legal: "SPV (Somos Brío SAC)", dip: null },
    { nombre: "Sostén",    sector: "Access Tech",  vertical: "Fintech",    etapa: "Pre Seed", cohorte: "C1", salud: "review", semLegal: "amarillo", exit: true,
      val: null, fl: 0.0, lucha: 0.0, ceibo: 0.0, pot: 5.0, cond: "Sweat + reconoc. de deuda (en exit)", moic: null, desemb: 0, comprom: 0,
      docs: ["draft","na","na","vacio"], legal: "Sweat Equity + Reconoc. de Deuda (en exit)", dip: null },
  ];

  // ---- banderas (viven en control legal; alimentan los chips) ----
  const FLAGS = [
    { id: "FA-01", empresa: "Faro",           area: "legal",   queFalta: "Firma del Pacto Luchante y del SAFE", dueno: "Legal externo", estado: "abierto" },
    { id: "FA-02", empresa: "Faro",           area: "deal",    queFalta: "Confirmar términos de la ronda con el founder", dueno: "por confirmar", estado: "abierto" },
    { id: "CO-01", empresa: "Cometa",         area: "legal",   queFalta: "Documentos del paquete EL sin firmar", dueno: "Legal externo", estado: "abierto" },
    { id: "CO-02", empresa: "Cometa",         area: "eval",    queFalta: "Re-evaluar viabilidad tras castigo de stake", dueno: "Analista financiero", estado: "abierto" },
    { id: "VI-01", empresa: "Vigía",          area: "legal",   queFalta: "CAA sin firma; conversión CLA pendiente", dueno: "Legal externo", estado: "abierto" },
    { id: "VI-02", empresa: "Vigía",          area: "fin",     queFalta: "Conciliar desembolso vs. comprometido", dueno: "Resp. Finanzas", estado: "abierto" },
    { id: "RA-01", empresa: "Raíz",           area: "legal",   queFalta: "Firma del convenio SIERRA", dueno: "Legal externo", estado: "abierto" },
    { id: "RA-02", empresa: "Raíz",           area: "eval",    queFalta: "Validar plan tras down round", dueno: "Analista financiero", estado: "abierto" },
    { id: "RC-01", empresa: "Ronda Circular", area: "legal",   queFalta: "Cierre de DD y firma de Side Letter", dueno: "Legal externo", estado: "abierto" },
    { id: "RC-02", empresa: "Ronda Circular", area: "fin",     queFalta: "Liberar tramo pendiente de comprometido", dueno: "Resp. Finanzas", estado: "abierto" },
    { id: "BO-01", empresa: "Botica",         area: "deal",    queFalta: "Definir si entra a pipeline formal", dueno: "por confirmar", estado: "abierto" },
    { id: "PS-01", empresa: "Pulso Salud",    area: "eval",    queFalta: "Revisión de hitos del RSA", dueno: "Analista financiero", estado: "abierto" },
    { id: "BR-01", empresa: "Brío",           area: "exit",    queFalta: "Cierre del exit vía SPV", dueno: "P. Cultura·P. Mercado·Finanzas", estado: "abierto" },
    { id: "SO-01", empresa: "Sostén",         area: "exit",    queFalta: "Reconocimiento de deuda en el exit", dueno: "P. Cultura·P. Mercado·Finanzas", estado: "abierto" },
    { id: "SO-02", empresa: "Sostén",         area: "estudio", queFalta: "Documentar sweat equity acumulado", dueno: "Operaciones·Managing Partner", estado: "abierto" },
    { id: "RU-01", empresa: "Ruta",           area: "estudio", queFalta: "Acordar entregables del sweat del Q", dueno: "Operaciones·Managing Partner", estado: "abierto" },
  ];

  // ---- síntesis determinista de la serie Q-a-Q ----
  // Devuelve por empresa: { val:[..], ganado:[..] } (sin Ceibo basis)
  // val = valuación del trimestre · ganado = % stake ganado sin Ceibo
  function synthSeries(b) {
    const entry = ENTRY[b.cohorte];
    const sinM = +(b.fl + b.lucha).toFixed(2);
    const valEnd = b.val;
    const valStart = (valEnd != null && b.moic) ? valEnd / b.moic : valEnd;
    const val = [], ganado = [];
    for (let i = 0; i < NQ; i++) {
      if (i < entry || valEnd == null) { val.push(null); ganado.push(null); continue; }
      const span = (NQ - 1) - entry || 1;
      const t = (i - entry) / span;        // 0..1 desde entrada a hoy
      // valuación: rampa suave de valStart→valEnd (sin dip)
      let v = valStart + (valEnd - valStart) * t;
      // stake ganado: arranca en ~60% del actual y sube a sinM hoy
      let g = sinM * (0.6 + 0.4 * t);
      val.push(Math.round(v / 1000) * 1000);
      ganado.push(+g.toFixed(2));
    }
    // aplicar dip explicado (si lo hay): hunde el trimestre y arrastra el final
    if (b.dip && val[b.dip.q] != null) {
      const q = b.dip.q;
      for (let i = q; i < NQ; i++) if (val[i] != null) val[i] = Math.round(val[i] * 0.82 / 1000) * 1000;
      val[NQ - 1] = valEnd; // ancla: el último trimestre es el valor real actual
    }
    if (val[NQ - 1] != null) val[NQ - 1] = valEnd;
    if (ganado[NQ - 1] != null) ganado[NQ - 1] = sinM;
    return { val, ganado };
  }

  // ---- construcción de empresas con derivados ----
  const empresas = BASE.map((b, idx) => {
    const sinCeiboPct = +(b.fl + b.lucha).toFixed(2);
    const totalPct = +(b.fl + b.lucha + b.ceibo).toFixed(2);
    const series = synthSeries(b);
    const valEntrada = (b.val != null && b.moic) ? b.val / b.moic : null;
    const porDesembolsar = Math.max(0, (b.comprom || 0) - (b.desemb || 0));
    const docs = {};
    CORE_DOCS.forEach((d, i) => { docs[d] = b.docs[i]; });
    const flags = FLAGS.filter((f) => f.empresa === b.nombre);
    return {
      id: b.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, ""), rank: idx + 1,
      nombre: b.nombre, sector: b.sector, vertical: b.vertical, etapa: b.etapa, cohorte: b.cohorte,
      salud: b.salud, semLegal: b.semLegal, exit: b.exit, legal: b.legal,
      valuacion: b.val, valEntrada, moic: b.moic,
      pct: { fl: b.fl, lucha: b.lucha, ceibo: b.ceibo, sinCeibo: sinCeiboPct, total: totalPct },
      potPct: b.pot, condiciones: b.cond,
      desembolsado: b.desemb, comprometido: b.comprom, porDesembolsar,
      docs, flags, series,
      dip: b.dip,
    };
  });
  const byId = Object.fromEntries(empresas.map((e) => [e.id, e]));

  // ---- helpers de alcance (scope) ----
  function scopePct(e, scopeId) {
    const s = SCOPE_BY_ID[scopeId] || SCOPE_BY_ID.sinCeibo;
    return +s.layers.reduce((sum, l) => sum + (e.pct[l] || 0), 0).toFixed(2);
  }
  // stake ganado % del trimestre i para un alcance (deriva del sin-Ceibo sintetizado)
  function scopePctAtQ(e, scopeId, i) {
    const g = e.series.ganado[i];
    if (g == null) return null;
    const sinM = e.pct.sinCeibo || 0;
    const target = scopePct(e, scopeId);
    if (sinM === 0) return 0;
    return +(g * (target / sinM)).toFixed(3);
  }
  // valor posición $ del trimestre i para un alcance
  function valorPosAtQ(e, scopeId, i) {
    const v = e.series.val[i], p = scopePctAtQ(e, scopeId, i);
    if (v == null || p == null) return null;
    return (p / 100) * v;
  }
  // valor posición $ HOY (último trimestre con dato real)
  function valorPosHoy(e, scopeId) {
    if (e.valuacion == null) return null;
    return (scopePct(e, scopeId) / 100) * e.valuacion;
  }

  // ---- agregados del header (dependen del alcance) ----
  function totals(scopeId) {
    let pos = 0, desemb = 0, comprom = 0, porDes = 0, n = 0, levantando = 0;
    for (const e of empresas) {
      const vp = valorPosHoy(e, scopeId);
      if (vp != null) pos += vp;
      desemb += e.desembolsado || 0; comprom += e.comprometido || 0; porDes += e.porDesembolsar || 0;
      n += 1;
    }
    const valorPortafolio = empresas.reduce((s, e) => s + (e.valuacion || 0), 0);
    const saludCounts = empresas.reduce((a, e) => { const k = e.salud || "sd"; a[k] = (a[k] || 0) + 1; return a; }, {});
    return { pos, desemb, comprom, porDes, n, valorPortafolio, saludCounts };
  }

  function flagCountByArea() {
    const m = {};
    for (const f of FLAGS) if (f.estado === "abierto") m[f.area] = (m[f.area] || 0) + 1;
    return m;
  }

  const FILTERS = {
    sector:  ["Access Tech", "Climate Tech", "Green Zebra"],
    cohorte: ["C1", "C2", "C3"],
    etapa:   ["Pre Seed", "Seed", "MVP"],
    salud:   ["good", "watch", "review"],
  };

  window.PORT = {
    QUARTERS, NQ, ENTRY, SCOPES, SCOPE_BY_ID, RESPONSABLES, RESP_BY_ID,
    DOC_STATES, CORE_DOCS, SALUD, LEGAL_SEM, LEGAL_LABEL, COHORTE_COLOR, COHORTE_AÑO,
    FILTERS, empresas, byId, FLAGS,
    scopePct, scopePctAtQ, valorPosAtQ, valorPosHoy, totals, flagCountByArea,
    saludKey: (e) => e.salud || "sd",
  };
})();
