export interface MissionStep {
  id: number;
  title: string;
  content: string;
  tips?: string[];
  warning?: string;
  image?: string;
  resources?: {
    title: string;
    url: string;
    type: 'video' | 'article' | 'quiz';
  }[];
}

export interface MissionData {
  id: number;
  title: string;
  description: string;
  points: number;
  emoji: string;
  steps: MissionStep[];
}

export const missionsData: MissionData[] = [
  {
    id: 1,
    title: "🔰 Bienvenido a Blockchain",
    description: "Aprende qué es una wallet y cómo funciona",
    points: 10,
    emoji: "🔰",
    steps: [
      {
        id: 1,
        title: "¿Qué es una Wallet?",
        content: "Una wallet (billetera) es tu puerta de entrada al mundo blockchain. Piensa en ella como tu cuenta bancaria digital que solo tú controlas.\n\nA diferencia de un banco tradicional, nadie más tiene acceso a tu dinero. Tú eres tu propio banco.",
        tips: [
          "Guarda tu seed phrase en un lugar seguro, como una caja fuerte",
          "Nunca compartas tu clave privada con nadie",
          "Haz copias de seguridad de tu información"
        ],
        warning: "¡Si pierdes tu seed phrase, pierdes acceso a tus fondos para siempre!",
        resources: [
          {
            title: "Video: ¿Qué es una Wallet?",
            url: "https://www.youtube.com/watch?v=example",
            type: "video"
          }
        ]
      },
      {
        id: 2,
        title: "Tipos de Wallets",
        content: "Existen diferentes tipos de wallets. Conoce cuál es mejor para ti según tus necesidades.",
        tips: [
          "Para empezar: Usa una Hot Wallet (más fácil)",
          "Para ahorros: Considera una Cold Wallet (más segura)",
          "Nunca guardes todas tus criptomonedas en un solo lugar"
        ],
        warning: "Diversifica para mayor seguridad. No pongas todos los huevos en la misma canasta."
      },
      {
        id: 3,
        title: "Tu Primera Transacción",
        content: "Aprende cómo firmar una transacción de forma segura.\n\nCada transacción en blockchain necesita tu firma digital para ser válida. Es como tu firma en un cheque, pero mucho más segura.",
        tips: [
          "Siempre verifica la dirección de destino antes de enviar",
          "Comienza con pequeñas cantidades para practicar",
          "Las transacciones en blockchain son irreversibles"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "💎 Tu Primer NFT",
    description: "Descubre qué son los NFTs y por qué son únicos",
    points: 20,
    emoji: "💎",
    steps: [
      {
        id: 1,
        title: "¿Qué es un NFT?",
        content: "NFT significa 'Non-Fungible Token' o Token No Fungible. Es un activo digital único que no puede ser replicado.\n\nPiensa en ello como un certificado de autenticidad digital para arte, música, coleccionables y más.",
        tips: [
          "Cada NFT es único y tiene un ID específico",
          "Los NFTs viven en la blockchain",
          "Puedes comprar, vender o intercambiar NFTs"
        ]
      },
      {
        id: 2,
        title: "Cómo Funcionan los NFTs",
        content: "Los NFTs utilizan contratos inteligentes (smart contracts) para garantizar la propiedad y autenticidad.\n\nCuando compras un NFT, la blockchain registra que tú eres el propietario legítimo.",
        tips: [
          "Verifica siempre el contrato del NFT antes de comprar",
          "Investiga al creador y el proyecto",
          "Cuidado con las copias y falsificaciones"
        ],
        warning: "No todos los NFTs tienen el mismo valor. Haz tu investigación antes de invertir."
      },
      {
        id: 3,
        title: "Creando tu Primer NFT",
        content: "El proceso de crear un NFT se llama 'minting'. Es como acuñar una moneda digital única.\n\nPuedes hacer NFTs de arte, música, videos, tweets y casi cualquier contenido digital.",
        tips: [
          "Necesitas pagar gas fees (tarifas de red) para crear un NFT",
          "Elige la blockchain adecuada para tu proyecto",
          "Los marketplaces facilitan el proceso de minting"
        ]
      },
      {
        id: 4,
        title: "Marketplaces de NFTs",
        content: "Los marketplaces son plataformas donde puedes comprar, vender y descubrir NFTs.\n\nAlgunos populares son OpenSea, Rarible, y Foundation.",
        tips: [
          "Conecta tu wallet antes de usar un marketplace",
          "Compara precios y fees entre diferentes plataformas",
          "Lee las reseñas y verifica la legitimidad del marketplace"
        ]
      }
    ]
  },
  {
    id: 3,
    title: "🤝 Smart Contracts 101",
    description: "Entiende cómo funcionan los contratos inteligentes",
    points: 30,
    emoji: "🤝",
    steps: [
      {
        id: 1,
        title: "¿Qué es un Smart Contract?",
        content: "Un smart contract (contrato inteligente) es un programa que se ejecuta automáticamente cuando se cumplen ciertas condiciones.\n\nEs como un acuerdo digital que se ejecuta solo, sin intermediarios.",
        tips: [
          "Los smart contracts son inmutables una vez desplegados",
          "Se ejecutan exactamente como están programados",
          "Eliminan la necesidad de intermediarios"
        ]
      },
      {
        id: 2,
        title: "Casos de Uso",
        content: "Los smart contracts tienen muchas aplicaciones:\n\n• DeFi (Finanzas Descentralizadas)\n• NFTs\n• DAOs (Organizaciones Autónomas Descentralizadas)\n• Votaciones\n• Seguros\n• Y mucho más...",
        tips: [
          "DeFi permite prestar, pedir prestado y ganar intereses sin bancos",
          "Los DAOs permiten gobernanza descentralizada",
          "Los smart contracts hacen posibles nuevos modelos de negocio"
        ]
      },
      {
        id: 3,
        title: "Interactuando con Smart Contracts",
        content: "Para usar un smart contract, necesitas:\n\n1. Una wallet conectada\n2. Fondos para pagar gas fees\n3. Entender qué hace el contrato\n\nSiempre verifica que el contrato sea legítimo antes de interactuar.",
        tips: [
          "Lee la documentación del proyecto",
          "Verifica el código si es posible (open source)",
          "Comienza con pequeñas cantidades"
        ],
        warning: "Los smart contracts pueden tener bugs o vulnerabilidades. Audita o usa contratos auditados."
      }
    ]
  },
  {
    id: 4,
    title: "🌐 Ethereum y Starknet",
    description: "Conoce la diferencia entre Layer 1 y Layer 2",
    points: 25,
    emoji: "🌐",
    steps: [
      {
        id: 1,
        title: "¿Qué es Ethereum?",
        content: "Ethereum es una blockchain de Layer 1 que permite ejecutar smart contracts y aplicaciones descentralizadas (dApps).\n\nEs como el 'computador mundial' donde cualquiera puede ejecutar programas descentralizados.",
        tips: [
          "Ethereum fue la primera blockchain en soportar smart contracts",
          "Tiene su propia criptomoneda llamada Ether (ETH)",
          "Miles de aplicaciones funcionan sobre Ethereum"
        ]
      },
      {
        id: 2,
        title: "El Problema de Escalabilidad",
        content: "Ethereum puede procesar solo ~15 transacciones por segundo, lo que causa:\n\n• Congestión de red\n• Altas tarifas de gas\n• Transacciones lentas\n\nPor eso nacieron las Layer 2 como Starknet.",
        tips: [
          "Las tarifas altas ocurren cuando hay mucha demanda",
          "Layer 2 resuelve estos problemas de escalabilidad",
          "Starknet puede procesar miles de transacciones por segundo"
        ]
      },
      {
        id: 3,
        title: "¿Qué es Starknet?",
        content: "Starknet es una Layer 2 de Ethereum que usa tecnología ZK-STARK para:\n\n• Transacciones más rápidas\n• Tarifas más baratas\n• Misma seguridad de Ethereum\n\nEs como una autopista rápida construida sobre Ethereum.",
        tips: [
          "Starknet hereda la seguridad de Ethereum",
          "Las transacciones son mucho más baratas",
          "Puedes mover fondos entre Ethereum y Starknet"
        ]
      },
      {
        id: 4,
        title: "Usando Starknet",
        content: "Para usar Starknet necesitas:\n\n1. Una wallet compatible (Argent X, Braavos)\n2. Fondos en Starknet (ETH)\n3. Conectarte a aplicaciones Starknet\n\n¡Ya estás usando Starknet con IntiDapp!",
        tips: [
          "Puedes hacer bridge de ETH desde Ethereum a Starknet",
          "Las dApps en Starknet funcionan similar a Ethereum",
          "Starknet está en constante desarrollo y mejora"
        ]
      }
    ]
  },
  {
    id: 5,
    title: "🔐 Seguridad en DeFi",
    description: "Aprende las mejores prácticas de seguridad",
    points: 40,
    emoji: "🔐",
    steps: [
      {
        id: 1,
        title: "Riesgos Comunes en DeFi",
        content: "DeFi ofrece grandes oportunidades pero también riesgos:\n\n• Smart contract bugs\n• Rug pulls y scams\n• Impermanent loss\n• Liquidaciones\n• Phishing attacks\n\nConocer estos riesgos es el primer paso para protegerte.",
        tips: [
          "Nunca inviertas más de lo que puedes permitirte perder",
          "Investiga siempre antes de usar un protocolo",
          "Diversifica tus inversiones"
        ],
        warning: "DeFi es experimental. Los smart contracts pueden tener vulnerabilidades."
      },
      {
        id: 2,
        title: "Verificando Proyectos",
        content: "Antes de usar un protocolo DeFi, verifica:\n\n• ¿Está auditado el código?\n• ¿Quién está detrás del proyecto?\n• ¿Cuánto TVL (Total Value Locked) tiene?\n• ¿Qué dicen las reseñas?\n\nUn protocolo legítimo será transparente sobre estos puntos.",
        tips: [
          "Busca auditorías de empresas reconocidas",
          "Revisa el TVL en sitios como DeFiLlama",
          "Lee la documentación oficial del proyecto"
        ]
      },
      {
        id: 3,
        title: "Protegiendo tu Wallet",
        content: "Tu wallet es tu responsabilidad:\n\n• Nunca compartas tu seed phrase\n• Usa hardware wallets para grandes cantidades\n• Verifica siempre las URLs\n• Desconecta tu wallet después de usar dApps\n• Mantén software actualizado",
        tips: [
          "Usa bookmarks para sitios que usas frecuentemente",
          "Verifica que la URL sea correcta (cuidado con phishing)",
          "Considera usar wallets separadas para diferentes propósitos"
        ],
        warning: "Si alguien obtiene tu seed phrase, puede robar todos tus fondos."
      },
      {
        id: 4,
        title: "Estrategias de Seguridad",
        content: "Implementa estas estrategias:\n\n• Comienza con pequeñas cantidades\n• Usa protocolos establecidos y auditados\n• Diversifica entre diferentes protocolos\n• Mantente informado sobre vulnerabilidades\n• Ten un plan de salida",
        tips: [
          "Sigue cuentas de seguridad en Twitter",
          "Únete a comunidades de DeFi para estar informado",
          "Practica con testnets antes de usar mainnet"
        ]
      }
    ]
  },
  {
    id: 6,
    title: "🌊 Liquidez y AMM",
    description: "Entiende cómo funcionan los pools de liquidez",
    points: 35,
    emoji: "🌊",
    steps: [
      {
        id: 1,
        title: "¿Qué es un AMM?",
        content: "AMM significa Automated Market Maker (Creador de Mercado Automatizado).\n\nEs un protocolo que permite intercambiar tokens sin necesidad de un libro de órdenes tradicional, usando pools de liquidez en su lugar.",
        tips: [
          "Los AMMs funcionan 24/7 sin intervención humana",
          "Uniswap fue el primer AMM popular",
          "Los precios se determinan por algoritmos matemáticos"
        ]
      },
      {
        id: 2,
        title: "Pools de Liquidez",
        content: "Un pool de liquidez es una colección de tokens bloqueados en un smart contract.\n\nPor ejemplo, un pool ETH/USDC contiene tanto ETH como USDC que los usuarios pueden intercambiar.\n\nLos proveedores de liquidez depositan ambos tokens y ganan fees.",
        tips: [
          "Necesitas depositar ambos tokens del par",
          "Ganas fees de cada intercambio que ocurre",
          "Más liquidez = menos slippage para los traders"
        ]
      },
      {
        id: 3,
        title: "Impermanent Loss",
        content: "Impermanent Loss ocurre cuando el precio de tus tokens cambia después de depositarlos en un pool.\n\nSi los precios divergen mucho, podrías tener menos valor que si hubieras mantenido los tokens por separado.\n\nSe llama 'impermanent' porque solo se realiza si retiras la liquidez.",
        tips: [
          "Es más común en pares volátiles",
          "Los fees pueden compensar el impermanent loss",
          "Considera pares estables para menor riesgo"
        ],
        warning: "Calcula siempre el impermanent loss potencial antes de proveer liquidez."
      },
      {
        id: 4,
        title: "Estrategias de Liquidez",
        content: "Estrategias para proveer liquidez:\n\n• Pares estables (USDC/USDT) - Bajo riesgo, bajos retornos\n• Pares correlacionados (ETH/stETH) - Riesgo medio\n• Pares volátiles (ETH/ALT) - Alto riesgo, altos retornos potenciales\n\nElige según tu tolerancia al riesgo.",
        tips: [
          "Diversifica entre diferentes pools",
          "Monitorea regularmente tus posiciones",
          "Considera el tiempo que planeas mantener la liquidez"
        ]
      }
    ]
  }
];

// Función helper para obtener una misión por ID
export function getMissionById(id: number): MissionData | undefined {
  return missionsData.find(mission => mission.id === id);
}

// Función para verificar si una misión está completada
export function isMissionCompleted(missionId: number, userAddress: string): boolean {
  if (!userAddress) return false;
  
  const storageKey = `intidapp_progress_${userAddress}`;
  const currentProgress = JSON.parse(localStorage.getItem(storageKey) || '{"missions": [], "totalPoints": 0}');
  
  return currentProgress.missions.includes(missionId);
}
