# Calculadora Luchante · cadena de ratio (referencia del motor)

Fuente de verdad: `calculadora_luchante.jsx`, sección "Resumen Lucha consolidado". Este doc documenta la lógica para que el motor la aplique sin re-derivar. Si la calculadora cambia, este doc se actualiza desde ella, no al revés.

**Unidad: todos los montos en miles de USD (1 = $1,000).**

## Inputs del deal

| Input | Significado | Default |
| --- | --- | --- |
| `v` | Valuation referencia (post-money de la ronda, sin descuentos) | **8000** |
| `ticket` | Cash del Fondo Luchante via SAFE en la ronda | **100** |
| `dRound` | Descuento sobre valuation de la ronda (aplica a TODO lo de LUCHA: ticket, sweat, vesting) | **20%** |
| `eiAmt` | CADE: monto que paga el FL al Studio al cierre (max 100) | **50** |
| `dEI` | CADE: descuento adicional encima del de ronda | **10%** |
| `prog` | Valorización del programa (sweat equity del Studio) | **300** |
| `premio` | Premio de vesting por hitos (equity adicional condicionado) | **100** |

## Cadena de cálculo

```
valDisc            = v * (1 - dRound/100)              # valuation con descuento de ronda
valEI              = valDisc * (1 - dEI/100)           # valuation para el tramo EI

flTicketStake      = ticket / valDisc                  # stake FL por el SAFE
flEIStake          = eiAmt / valEI                     # stake FL por la CADE
flTotalStake       = flTicketStake + flEIStake         # stake total del FL

studioGrossStake   = prog / valDisc                    # stake bruto del Studio (sweat)
studioPostEIStake  = studioGrossStake - flEIStake      # el Studio le vende el EI al FL
vestStake          = premio / valDisc                  # stake adicional por vesting
studioWithVesting  = studioPostEIStake + vestStake     # stake del Studio con hitos cumplidos

founderDilUpfront  = flTicketStake + studioGrossStake
founderDilFull     = founderDilUpfront + vestStake

ratioNoVest        = studioPostEIStake / flTotalStake  # Studio sobre FL, sin vesting
ratioVest          = studioWithVesting / flTotalStake  # Studio sobre FL, con vesting

valBlendedFL       = (ticket + eiAmt) / flTotalStake   # valuation efectivo al que entra el FL
```

Con los defaults: `valBlendedFL` = 150 / 2.43% ≈ **6,171** (USD ~6.17M post-money efectivo).

## Lectura del ratio

El ratio Studio/FL se diseña para quedar **> 1**: el contribuyente de método (Studio) pesa más que el contribuyente de cash (FL). Reportar siempre las dos versiones.

## Ejemplo trabajado (defaults)

Con los defaults de arriba:

- `valDisc` = 8000 * 0.8 = **6400**
- `valEI` = 6400 * 0.9 = **5760**
- `flTotalStake` = 100/6400 + 50/5760 = **2.43%**
- `studioPostEIStake` = 300/6400 menos 50/5760 = **3.82%**
- `ratioNoVest` = 3.82 / 2.43 = **1.57x**
- `studioWithVesting` = 3.82% + 100/6400 = **5.38%**
- `ratioVest` = 5.38 / 2.43 = **2.21x**

Si los números del caso no reproducen estas relaciones con sus propios inputs, hay un error de parámetros: revisar antes de reportar.

## Bandera de valuation a vigilar

El default de la calculadora es valuation **8000** (USD 8M post-money) con ticket **100** (USD 100K). Si la documentación del deal trae otro número (ej. USD 6M post-money con ticket USD 200K), es una discrepancia que debe resolverse y confirmarse el número canónico antes de la defensa en comité. Marcarla como bandera, no asumir cuál es el correcto.
