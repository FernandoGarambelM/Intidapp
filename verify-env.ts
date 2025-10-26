import dotenv from "dotenv";

dotenv.config();

console.log("\n🔍 VERIFICANDO CONFIGURACIÓN DEL .env\n");

const address = process.env.DEPLOYER_ADDRESS;
const privateKey = process.env.DEPLOYER_PRIVATE_KEY;
const rpc = process.env.RPC_URL;

console.log("1. DEPLOYER_ADDRESS:");
if (!address) {
  console.log("   ❌ NO CONFIGURADA");
} else if (!address.startsWith("0x")) {
  console.log("   ⚠️  No empieza con 0x");
  console.log(`   Longitud: ${address.length} caracteres`);
} else {
  console.log("   ✅ Configurada correctamente");
  console.log(`   Formato: ${address.slice(0, 6)}...${address.slice(-4)}`);
  console.log(`   Longitud: ${address.length} caracteres`);
}

console.log("\n2. DEPLOYER_PRIVATE_KEY:");
if (!privateKey) {
  console.log("   ❌ NO CONFIGURADA");
} else if (!privateKey.startsWith("0x")) {
  console.log("   ⚠️  No empieza con 0x");
  console.log(`   Longitud: ${privateKey.length} caracteres`);
} else {
  console.log("   ✅ Configurada correctamente");
  console.log(`   Formato: 0x${privateKey.slice(2, 6)}...${privateKey.slice(-4)}`);
  console.log(`   Longitud: ${privateKey.length} caracteres`);
}

console.log("\n3. RPC_URL:");
if (!rpc) {
  console.log("   ⚠️  Usando default: https://starknet-sepolia.public.blastapi.io");
} else {
  console.log("   ✅ Configurada:", rpc);
}

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

if (!address || !privateKey) {
  console.log("❌ FALTAN VARIABLES. Edita tu archivo .env\n");
  process.exit(1);
}

if (!address.startsWith("0x") || !privateKey.startsWith("0x")) {
  console.log("⚠️  ADVERTENCIA: Las direcciones deben empezar con 0x\n");
  console.log("Ejemplo correcto:");
  console.log("DEPLOYER_ADDRESS=0x1234567890abcdef...");
  console.log("DEPLOYER_PRIVATE_KEY=0xabcdef1234567890...\n");
}

if (address.length < 60 || address.length > 70) {
  console.log("⚠️  ADVERTENCIA: La dirección parece incorrecta");
  console.log(`   Longitud esperada: 66 caracteres`);
  console.log(`   Tu longitud: ${address.length} caracteres\n`);
}

if (privateKey.length < 60 || privateKey.length > 70) {
  console.log("⚠️  ADVERTENCIA: La clave privada parece incorrecta");
  console.log(`   Longitud esperada: 66 caracteres`);
  console.log(`   Tu longitud: ${privateKey.length} caracteres\n`);
}

console.log("✅ Verificación completada\n");
