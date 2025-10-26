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
    title: "Bienvenido a Blockchain",
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
    title: "Tu Primer NFT",
    description: "Descubre el mundo de los NFTs y crea tu primer token",
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
    title: "Smart Contracts 101",
    description: "Entiende cómo funcionan los contratos inteligentes",
    points: 15,
    emoji: "📜",
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
  }
];

// Función helper para obtener una misión por ID
export function getMissionById(id: number): MissionData | undefined {
  return missionsData.find(mission => mission.id === id);
}
