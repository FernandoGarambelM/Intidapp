# 🚀 Instrucciones para Desplegar IntiDapp

## ❌ Problema Actual

Tu cuenta de ArgentX **NO está desplegada** en Starknet Sepolia y **NO tiene fondos**.

El error que recibes:
```
"Resources bounds exceed balance (0)"
"Contract not found"
```

Esto significa:
1. ❌ Balance = 0 ETH (necesitas fondos)
2. ❌ Cuenta no desplegada (necesitas desplegarla primero)

---

## ✅ Solución Paso a Paso

### PASO 1: Obtener Fondos Gratis 🎁

Tu dirección de wallet:
```
0x463ec107a7c62525da1f6f297b82b126b2acd298cd6950bffa1f1dd485404d
```

**Opción A: Faucet de Blast API** (RECOMENDADO)
1. Ve a: https://blastapi.io/faucets/starknet-sepolia-eth
2. Pega tu dirección
3. Completa el captcha
4. Haz clic en "Request Funds"
5. ✅ **Este faucet despliega tu cuenta automáticamente**

**Opción B: Faucet de Starknet**
1. Ve a: https://starknet-faucet.vercel.app/
2. Pega tu dirección
3. Solicita fondos

---

### PASO 2: Verificar que Llegaron los Fondos ⏳

Espera 2-5 minutos y luego ejecuta:
```bash
npx tsx check-balance.ts
```

Deberías ver:
```
💰 Balance: 0.XXXXX ETH
✅ Tienes fondos suficientes para desplegar
```

---

### PASO 3: Verificar si tu Cuenta Está Desplegada 🔍

Si usaste el faucet de Blast API, tu cuenta YA debería estar desplegada.

Para verificar:
```bash
npx tsx deploy-account.ts
```

Si ves:
```
✅ ¡Tu cuenta YA está desplegada!
```

¡Perfecto! Salta al PASO 4.

Si ves:
```
⚠️ Cuenta no encontrada. Procediendo a desplegar...
```

El script intentará desplegar tu cuenta automáticamente.

---

### PASO 4: Desplegar el Contrato IntiDapp 🎯

Una vez que tu cuenta esté desplegada Y tenga fondos:

```bash
npx tsx deploy.ts
```

Si todo sale bien, verás:
```
╔═══════════════════════════════════════════════════════════╗
║        🎉 ¡CONTRATO DESPLEGADO EXITOSAMENTE! 🎉          ║
╚═══════════════════════════════════════════════════════════╝

📍 Contract Address:
   0x...tu dirección del contrato...
```

---

## 🔧 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npx tsx check-balance.ts` | Verifica tu balance y estado de cuenta |
| `npx tsx deploy-account.ts` | Despliega tu cuenta de ArgentX |
| `npx tsx deploy.ts` | Despliega el contrato IntiDapp |

---

## 🆘 Errores Comunes

### "Contract not found"
→ Tu cuenta no está desplegada. Usa el faucet de Blast API o ejecuta `deploy-account.ts`

### "InsufficientAccountBalance"
→ No tienes fondos. Ve al faucet y solicita ETH de testnet.

### "ClassAlreadyDeclared"
→ Normal. El contrato ya fue declarado antes. Continúa con el proceso.

---

## ✅ Checklist

- [ ] Obtuve fondos del faucet
- [ ] Mi cuenta está desplegada
- [ ] Tengo balance > 0 ETH
- [ ] Desplegué el contrato IntiDapp exitosamente
- [ ] Copié el Contract Address al frontend

---

## 📚 Enlaces Útiles

- **Faucet Blast API:** https://blastapi.io/faucets/starknet-sepolia-eth
- **Faucet Starknet:** https://starknet-faucet.vercel.app/
- **Explorador Sepolia:** https://sepolia.voyager.online/
- **Ver tu cuenta:** https://sepolia.voyager.online/contract/0x463ec107a7c62525da1f6f297b82b126b2acd298cd6950bffa1f1dd485404d

---

**Fecha:** 26 de octubre de 2025
