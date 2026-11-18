Near-black ink button matching the equipo app's shadcn skin — use for primary actions, `outline`/`ghost` in dense toolbars.

```jsx
<Button>Guardar</Button>
<Button variant="outline" size="sm">Recalcular</Button>
<Button variant="ghost" size="icon" aria-label="Editar"><PencilIcon /></Button>
```

Variants: `default` (ink), `destructive`, `outline`, `secondary`, `ghost`, `link`. Sizes: `default`, `sm`, `lg`, `icon`. Forwards all native button props.
