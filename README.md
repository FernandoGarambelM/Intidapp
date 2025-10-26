# 🌟 IntiDapp - Plataforma Educativa Gamificada en Blockchain

<div align="center">

![IntiDapp Logo](https://img.shields.io/badge/IntiDapp-Blockchain%20Education-purple?style=for-the-badge)
![Starknet](https://img.shields.io/badge/Starknet-Sepolia-orange?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![Cairo](https://img.shields.io/badge/Cairo-Smart%20Contracts-blue?style=for-the-badge)

**Iluminando el futuro de América Latina a través de la educación blockchain**

[Demo](#demo) • [Instalación](#instalación) • [Arquitectura](#arquitectura) • [Uso](#uso)

</div>

---

## 📖 Índice

- [¿Qué es IntiDapp?](#qué-es-intidapp)
- [Características](#características)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Uso](#uso)
- [Smart Contract](#smart-contract)
- [Frontend](#frontend)
- [Cómo Funciona](#cómo-funciona)
- [Roadmap](#roadmap)
- [Contribuir](#contribuir)

---

## 🎯 ¿Qué es IntiDapp?

**IntiDapp** (de "Inti" - dios del sol en quechua) es una plataforma educativa descentralizada que gamifica el aprendizaje de tecnologías blockchain. Los estudiantes completan misiones educativas, ganan puntos que se registran inmutablemente en la blockchain de Starknet, y pueden demostrar su progreso de manera verificable.

### 🎮 Concepto Principal

```
Estudiante → Completa Misión → Gana Puntos → Registrado en Blockchain
                                                      ↓
                                              Progreso Verificable
```

---

## ✨ Características

### Para Estudiantes

- 🎓 **Misiones Educativas**: Aprende sobre blockchain, NFTs, smart contracts
- 📊 **Progreso On-Chain**: Tus logros se registran en la blockchain
- 🏆 **Sistema de Puntos**: Gamificación del aprendizaje
- 🔒 **Verificación Inmutable**: Demuestra tus habilidades de forma verificable
- 💼 **Portafolio Blockchain**: Usa tu progreso como credencial profesional

### Técnicas

- ⚡ **Gas Eficiente**: Cada estudiante paga su propio gas (~$0.0001 USD)
- 🔐 **Descentralizado**: Sin servidor central, 100% on-chain
- 🌐 **Accesible**: Interfaz web simple, solo necesitas una wallet
- 📱 **Responsive**: Funciona en desktop y móvil

---

---

## 🏗️ Arquitectura del Proyecto

```
┌─────────────────────────────────────────────────────────────┐
│                      USUARIO (Estudiante)                    │
│                                                              │
│  [Navegador] ← Interfaz Web → [ArgentX Wallet]             │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ Conexión Web3
                 ↓
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                        │
│                                                              │
│  • WalletBar.tsx    → Conecta wallet                        │
│  • ProgressBar.tsx  → Lee progreso del contrato             │
│  • MissionCard.tsx  → Envía transacciones                   │
│  • Providers.tsx    → Configura Starknet React              │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ Starknet.js
                 ↓
┌─────────────────────────────────────────────────────────────┐
│               STARKNET SEPOLIA (Layer 2)                     │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Smart Contract (Cairo)                      │   │
│  │                                                      │   │
│  │  #[storage]                                          │   │
│  │  progress: Map<ContractAddress, u128>                │   │
│  │                                                      │   │
│  │  complete_mission(points: u128) → ✍️ Escribe        │   │
│  │  get_progress(student: addr) → 👁️ Lee              │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ Rollup (eventual)
                 ↓
┌─────────────────────────────────────────────────────────────┐
│              ETHEREUM MAINNET (Layer 1)                      │
│                                                              │
│  • Valida pruebas de Starknet                               │
│  • Seguridad final                                          │
└─────────────────────────────────────────────────────────────┘
```

### 📁 Estructura de Archivos

```
intidapp/
├── contracts/                    # Smart Contracts en Cairo
│   ├── src/
│   │   └── lib.cairo            # Contrato IntiProgress
│   ├── Scarb.toml               # Configuración del proyecto
│   └── target/dev/              # Archivos compilados
│
├── frontend/                     # Aplicación Web
│   ├── app/
│   │   ├── components/
│   │   │   ├── Providers.tsx    # Config Starknet React
│   │   │   ├── WalletBar.tsx    # Conexión de wallet
│   │   │   ├── ProgressBar.tsx  # Lectura de progreso
│   │   │   └── MissionCard.tsx  # Interacción con contrato
│   │   ├── lib/
│   │   │   └── abi.ts           # ABI del contrato
│   │   ├── layout.tsx           # Layout principal
│   │   └── page.tsx             # Página de inicio
│   ├── public/
│   │   └── abi.json             # ABI exportado
│   └── package.json
│
├── deploy.ts                     # Script de despliegue
├── deploy-account.ts             # Despliega cuenta ArgentX
├── verify-env.ts                 # Verifica configuración
├── .env                          # Variables de entorno (LOCAL)
├── .env.example                  # Plantilla de variables
├── .gitignore                    # Archivos ignorados por Git
└── README.md                     # Esta documentación
```

---

## 🛠️ Tecnologías Utilizadas

### Blockchain & Smart Contracts

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Starknet** | Sepolia Testnet | Layer 2 de Ethereum para escalabilidad |
| **Cairo** | 2.x | Lenguaje para smart contracts |
| **Scarb** | Latest | Build tool para Cairo |
| **Starknet.js** | 8.x | Librería JavaScript para Starknet |

### Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js** | 16.0 | Framework React para SSR |
| **TypeScript** | 5.x | Tipado estático |
| **Tailwind CSS** | 3.x | Estilos utility-first |
| **Starknet React** | 5.x | Hooks para Starknet |
| **ArgentX** | Latest | Wallet de Starknet |

### DevOps

- **dotenv**: Manejo de variables de entorno
- **tsx**: Ejecución de TypeScript
- **Git**: Control de versiones

---

## 🚀 Instalación

### Prerequisitos

- **Node.js** >= 18.0
- **npm** >= 9.0
- **Scarb** (para compilar contratos Cairo)
- **ArgentX Wallet** (extensión de navegador)

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/intidapp.git
cd intidapp
```

### Paso 2: Instalar Dependencias del Frontend

```bash
cd frontend
npm install
```

### Paso 3: Configurar Variables de Entorno

```bash
# En la raíz del proyecto
cp .env.example .env
nano .env
```

Rellena con tus credenciales:
```env
DEPLOYER_ADDRESS=0xTU_DIRECCION_DE_ARGENTX
DEPLOYER_PRIVATE_KEY=0xTU_CLAVE_PRIVADA
RPC_URL=https://starknet-sepolia.public.blastapi.io
```

⚠️ **IMPORTANTE**: Nunca subas `.env` a GitHub

### Paso 4: Compilar el Smart Contract

```bash
cd contracts
scarb build
```

### Paso 5: Desplegar el Contrato (requiere fondos en testnet)

```bash
cd ..
npm install starknet tsx dotenv
npx tsx deploy.ts
```

### Paso 6: Actualizar la Dirección del Contrato

Edita `frontend/app/page.tsx`:
```typescript
const CONTRACT_ADDRESS = "0xTU_CONTRACT_ADDRESS_AQUI";
```

### Paso 7: Ejecutar el Frontend

```bash
cd frontend
npm run dev
```

Abre http://localhost:3000

---

## 📱 Uso

### Para Estudiantes

1. **Instala ArgentX**
   - Extensión de navegador
   - Crea una wallet
   - Cambia a red Sepolia Testnet

2. **Consigue fondos de prueba**
   - Ve a un faucet: https://www.alchemy.com/faucets/starknet-sepolia
   - Solicita STRK gratuitos

3. **Conecta tu Wallet**
   - Abre http://localhost:3000
   - Click en "Conectar Wallet"
   - Aprueba en ArgentX

4. **Completa Misiones**
   - Selecciona una misión
   - Click en "Completar Misión 🚀"
   - Confirma la transacción en ArgentX
   - Espera 30-60 segundos

5. **Ve tu Progreso**
   - La barra de progreso se actualiza automáticamente
   - Tus puntos quedan registrados en blockchain

### Para Desarrolladores

```bash
# Verificar configuración
npx tsx verify-env.ts

# Compilar contrato
cd contracts && scarb build

# Desplegar contrato
npx tsx deploy.ts

# Ejecutar frontend en desarrollo
cd frontend && npm run dev

# Build para producción
cd frontend && npm run build
```

---

## 📜 Smart Contract

### Código del Contrato (Cairo)

```cairo
#[starknet::contract]
mod IntiProgress {
    use starknet::{ContractAddress, get_caller_address};
    use core::starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess};

    #[storage]
    struct Storage {
        progress: Map<ContractAddress, u128>,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        MissionCompleted: MissionCompleted,
    }

    #[derive(Drop, starknet::Event)]
    struct MissionCompleted {
        student: ContractAddress,
        points_earned: u128,
        total_points: u128,
    }

    #[abi(embed_v0)]
    impl IntiProgressImpl of super::IIntiProgress<ContractState> {
        fn complete_mission(ref self: ContractState, points: u128) {
            let student = get_caller_address();
            let current_progress = self.progress.read(student);
            let new_progress = current_progress + points;
            self.progress.write(student, new_progress);

            self.emit(MissionCompleted {
                student,
                points_earned: points,
                total_points: new_progress,
            });
        }

        fn get_progress(self: @ContractState, student: ContractAddress) -> u128 {
            self.progress.read(student)
        }
    }
}
```

### Explicación del Contrato

#### Storage
```cairo
progress: Map<ContractAddress, u128>
```
- Mapeo que asocia cada dirección de estudiante con sus puntos
- `ContractAddress`: Dirección única de la wallet del estudiante
- `u128`: Número entero sin signo de 128 bits para los puntos

#### Función: complete_mission

```cairo
fn complete_mission(ref self: ContractState, points: u128)
```

**¿Qué hace?**
1. Obtiene la dirección del estudiante (`get_caller_address()`)
2. Lee los puntos actuales del storage
3. Suma los nuevos puntos
4. Guarda el total actualizado
5. Emite un evento `MissionCompleted`

**Costo:** El estudiante paga el gas (~0.0001 STRK)

#### Función: get_progress

```cairo
fn get_progress(self: @ContractState, student: ContractAddress) -> u128
```

**¿Qué hace?**
1. Lee los puntos de un estudiante específico
2. Retorna el valor

**Costo:** GRATIS (solo lectura, no modifica estado)

#### Events

```cairo
struct MissionCompleted {
    student: ContractAddress,
    points_earned: u128,
    total_points: u128,
}
```

Los eventos permiten:
- Rastrear el historial de misiones completadas
- Crear dashboards y estadísticas
- Notificar aplicaciones externas

---

## 💻 Frontend

### Componentes Principales

#### 1. Providers.tsx
**Propósito**: Configura la conexión a Starknet

```typescript
export function Providers({ children }: { children: ReactNode }) {
  return (
    <StarknetConfig
      chains={[sepolia]}
      provider={publicProvider()}
      connectors={[argentX(), braavos()]}
    >
      {children}
    </StarknetConfig>
  );
}
```

**Qué hace:**
- Define las wallets disponibles (ArgentX, Braavos)
- Configura la red (Sepolia Testnet)
- Provee el contexto de Starknet a toda la app

---

#### 2. WalletBar.tsx
**Propósito**: Conectar y desconectar wallet

```typescript
export default function WalletBar() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  return (
    <div>
      {!address ? (
        // Mostrar botones de conexión
        connectors.map((connector) => (
          <button onClick={() => connect({ connector })}>
            Conectar {connector.id}
          </button>
        ))
      ) : (
        // Mostrar dirección y botón de desconexión
        <div>
          <p>{address.slice(0, 6)}...{address.slice(-4)}</p>
          <button onClick={() => disconnect()}>Desconectar</button>
        </div>
      )}
    </div>
  );
}
```

**Flujo:**
1. Usuario click "Conectar ArgentX"
2. Se abre popup de ArgentX
3. Usuario aprueba conexión
4. `address` se llena con la dirección de la wallet
5. Interfaz se actualiza automáticamente

---

#### 3. ProgressBar.tsx
**Propósito**: Leer y mostrar progreso del estudiante

```typescript
export default function ProgressBar({ contractAddress }: Props) {
  const { address } = useAccount();
  
  const { data } = useReadContract({
    address: contractAddress,
    abi: CONTRACT_ABI,
    functionName: "get_progress",
    args: address ? [address] : [],
    watch: true,
    refetchInterval: 3000,
    enabled: !!(address && isValidContract),
  });

  const points = data ? Number(data) : 0;
  
  return (
    <div>
      <span>{points} pts</span>
      <div style={{ width: `${progress}%` }}>
        Barra de progreso
      </div>
    </div>
  );
}
```

**Cómo funciona:**
1. Obtiene la dirección del usuario conectado
2. Llama a `get_progress(address)` del contrato
3. Actualiza automáticamente cada 3 segundos (`refetchInterval`)
4. Muestra los puntos en la interfaz
5. **No cuesta gas** (solo lectura)

---

#### 4. MissionCard.tsx
**Propósito**: Completar misiones y escribir en blockchain

```typescript
export default function MissionCard({ points, contractAddress }: Props) {
  const { account } = useAccount();
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = async () => {
    const contract = new Contract(CONTRACT_ABI, contractAddress, account);
    
    // Llamar función del contrato
    const result = await contract.complete_mission(points);
    
    // Esperar confirmación
    await account.waitForTransaction(result.transaction_hash);
    
    alert(`🎉 ¡Misión completada! +${points} puntos`);
  };

  return (
    <div>
      <h3>{title}</h3>
      <button onClick={handleComplete} disabled={isCompleting}>
        {isCompleting ? "Completando..." : "Completar Misión 🚀"}
      </button>
    </div>
  );
}
```

**Flujo completo:**
1. Usuario click "Completar Misión"
2. Se crea instancia del contrato
3. Se llama `complete_mission(points)`
4. ArgentX muestra popup de confirmación
5. Usuario aprueba y paga gas (~$0.0001)
6. Transacción se envía a Starknet
7. Espera confirmación (30-60 seg)
8. Puntos se actualizan en blockchain
9. ProgressBar detecta cambio y actualiza UI

---

### Paso 3: Desplegar el Smart Contract

Necesitamos:
1. Tu dirección de wallet de ArgentX
2. Tu clave privada (NUNCA la compartas públicamente)

**¿Cómo obtener tu clave privada?**
- Abre ArgentX
- Click en Settings (⚙️)
- Click en tu cuenta
- Export Private Key
- **⚠️ NUNCA la subas a GitHub ni la compartas**

**Crear archivo de deploy:**

```bash
cd /home/fernando/universidad/hackatones/intidapp
npm install starknet tsx
```

Crea un archivo `deploy.ts` en la raíz del proyecto con este contenido:

```typescript
import {
  Contract,
  Account,
  RpcProvider,
} from "starknet";
import fs from "fs";

async function main() {
  // 1. Conectar a Sepolia
  const provider = new RpcProvider({
    nodeUrl: "https://starknet-sepolia.public.blastapi.io",
  });

  console.log("✅ Conectado a Starknet Sepolia");

  // 2. REEMPLAZA ESTOS VALORES CON LOS TUYOS
  const accountAddress = "TU_DIRECCION_AQUI"; // Ejemplo: 0x1234...
  const privateKey = "TU_CLAVE_PRIVADA_AQUI"; // Ejemplo: 0xabcd...
  
  const account = new Account(provider, accountAddress, privateKey);
  console.log("✅ Cuenta conectada:", accountAddress);

  // 3. Leer archivos compilados
  const sierraPath = "./contracts/target/dev/intidapp_inti_progress.contract_class.json";
  const casmPath = "./contracts/target/dev/intidapp_inti_progress.compiled_contract_class.json";
  
  const sierraCode = JSON.parse(fs.readFileSync(sierraPath, "utf-8"));
  const casmCode = JSON.parse(fs.readFileSync(casmPath, "utf-8"));

  // 4. Declarar el contrato
  console.log("📤 Declarando contrato...");
  const declareResponse = await account.declare({
    contract: sierraCode,
    casm: casmCode,
  });
  
  await provider.waitForTransaction(declareResponse.transaction_hash);
  const classHash = declareResponse.class_hash;
  console.log("✅ Class Hash:", classHash);

  // 5. Desplegar
  console.log("🚀 Desplegando contrato...");
  const deployResponse = await account.deployContract({ 
    classHash: classHash 
  });
  
  await provider.waitForTransaction(deployResponse.transaction_hash);
  console.log("✅ ¡Contrato desplegado!");
  console.log("📍 Contract Address:", deployResponse.contract_address);
  console.log("\n🎯 COPIA ESTA DIRECCIÓN y reemplázala en frontend/app/page.tsx");
  console.log("en la línea: const CONTRACT_ADDRESS = ...");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
```

**Ejecutar deploy:**

```bash
npx tsx deploy.ts
```

---

### Paso 4: Actualizar el Frontend

Después del deploy, copia la **Contract Address** que aparece en la terminal.

Edita `frontend/app/page.tsx` y reemplaza:

```typescript
const CONTRACT_ADDRESS = "0x0000..."; // ← Pega aquí tu dirección
```

---

### Paso 5: ¡Probar Todo!

```bash
cd frontend
npm run dev
```

Ahora deberías poder:
1. ✅ Conectar tu wallet ArgentX
2. ✅ Ver tu progreso (0 puntos inicialmente)
3. ✅ Completar misiones (confirma en tu wallet)
4. ✅ Ver cómo sube tu progreso

---

## 📚 Comandos Útiles

```bash
# Compilar contrato
cd contracts
export PATH="$HOME/.local/bin:$PATH"
scarb build

# Ejecutar frontend
cd frontend
npm run dev

# Desplegar contrato
npx tsx deploy.ts
```

---

## 🔍 Verificar Transacciones

Después de completar una misión, puedes ver la transacción en:
- **Voyager:** https://sepolia.voyager.online/
- **Starkscan:** https://sepolia.starkscan.co/

Busca por tu dirección de wallet o el Contract Address.

---

## ❓ Solución de Problemas

### Error: "Account not found"
- Asegúrate de haber desplegado tu cuenta en ArgentX
- Envía una transacción de prueba primero

### Error: "Insufficient balance"
- Consigue más ETH del faucet

### El progreso no se actualiza
- Espera 3 segundos (refetch interval)
- Refresca la página
- Verifica que el CONTRACT_ADDRESS sea correcto

---

## 🗺️ Roadmap

### Fase Actual: MVP ✅
- [x] Smart contract básico
- [x] Frontend funcional
- [x] Conexión de wallet
- [x] Sistema de puntos

### Fase 2: Gamificación Avanzada
- [ ] Niveles y badges
- [ ] Leaderboard (tabla de clasificación)
- [ ] Misiones con prerequisitos
- [ ] Sistema de racha (streak)

### Fase 3: NFTs y Recompensas
- [ ] NFTs como certificados al completar niveles
- [ ] Badges visuales en el perfil
- [ ] Marketplace de logros

### Fase 4: Contenido Educativo
- [ ] Videos integrados
- [ ] Quizzes interactivos
- [ ] Rutas de aprendizaje personalizadas
- [ ] Recursos descargables

### Fase 5: Social y Comunidad
- [ ] Perfiles de usuario
- [ ] Compartir progreso en redes
- [ ] Equipos y competencias
- [ ] Mentorías

### Fase 6: Producción
- [ ] Deploy a Mainnet
- [ ] Backend con autenticación (Sign-In with Starknet)
- [ ] Base de datos para contenido
- [ ] Analytics y métricas

---

## 👥 Contribuir

¿Quieres mejorar IntiDapp? ¡Las contribuciones son bienvenidas!

### Cómo contribuir

1. **Fork el repositorio**
2. **Crea una rama**: `git checkout -b feature/nueva-funcionalidad`
3. **Haz cambios y commit**: `git commit -m "Agrega nueva funcionalidad"`
4. **Push**: `git push origin feature/nueva-funcionalidad`
5. **Crea Pull Request**

### Ideas para contribuir

- 🎨 Mejorar el diseño UI/UX
- 📝 Agregar más misiones educativas
- 🐛 Reportar y corregir bugs
- 📖 Mejorar documentación
- 🌍 Traducir a otros idiomas
- ⚡ Optimizar smart contracts

---

## 📄 Licencia

MIT License - Siéntete libre de usar este proyecto para aprender y construir.

---

## 🙏 Agradecimientos

- **Starknet**: Por proveer una Layer 2 escalable
- **ArgentX**: Por la mejor wallet de Starknet
- **Cairo Lang**: Por un lenguaje de smart contracts seguro
- **Next.js**: Por el mejor framework React
- **Comunidad Blockchain**: Por todo el apoyo y recursos

---

## 📞 Contacto y Soporte

- **Documentación**: Ver `EXPLICACION_COMPLETA.md` para entender el proyecto
- **Issues**: Reporta bugs en GitHub Issues
- **Preguntas**: Únete al Discord de Starknet

---

## 🌟 Showcase

### Screenshots

*(Agrega screenshots de tu aplicación aquí)*

### Demo Video

*(Agrega link a video demo)*

### Casos de Uso

1. **Estudiantes universitarios**: Aprenden blockchain mientras ganan credenciales verificables
2. **Bootcamps**: Integran la plataforma en sus cursos
3. **Empresas**: Verifican habilidades de candidatos
4. **Comunidades**: Organizan hackathons y competencias

---

## 🔧 Troubleshooting

Ver `SOLUCION_ERRORES.md` para problemas comunes y soluciones.

### Problemas Frecuentes

**Frontend no carga**
```bash
cd frontend
rm -rf .next node_modules
npm install
npm run dev
```

**Error al desplegar contrato**
```bash
# Verificar configuración
npx tsx verify-env.ts

# Verificar que tu cuenta esté desplegada
npx tsx deploy-account.ts
```

**Transacción pendiente**
- Espera 2-3 minutos
- Verifica en Voyager: https://sepolia.voyager.online/

---

**Construido con ❤️ para América Latina**

*IntiDapp - Iluminando el futuro de la educación blockchain*


