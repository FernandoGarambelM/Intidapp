import { Account, RpcProvider } from "starknet";
import dotenv from "dotenv";
import fs from "fs";

// Cargar variables de entorno desde .env
dotenv.config();

async function main() {
  console.log("🚀 Iniciando despliegue del contrato IntiDapp...\n");

  // 1. Verificar que las variables de entorno existan
  const accountAddress = process.env.DEPLOYER_ADDRESS;
  const privateKey = process.env.DEPLOYER_PRIVATE_KEY;
  const rpcUrl = process.env.RPC_URL || "https://starknet-sepolia.public.blastapi.io";

  if (!accountAddress || !privateKey) {
    console.error("❌ ERROR: Faltan variables de entorno");
    console.error("\n📝 Sigue estos pasos:");
    console.error("1. Copia .env.example a .env");
    console.error("2. Rellena DEPLOYER_ADDRESS con tu dirección de ArgentX");
    console.error("3. Rellena DEPLOYER_PRIVATE_KEY con tu clave privada\n");
    process.exit(1);
  }

  // 2. Conectar a Starknet Sepolia
  const provider = new RpcProvider({ nodeUrl: rpcUrl });
  console.log("✅ Conectado a Starknet Sepolia");
  console.log(`   RPC: ${rpcUrl}\n`);

  // 3. Configurar cuenta
  const account = new Account(provider, accountAddress, privateKey);
  console.log("✅ Cuenta configurada");
  console.log(`   Dirección: ${accountAddress}\n`);

  // 4. Leer archivos compilados del contrato
  const sierraPath = "./contracts/target/dev/intidapp_inti_progress.contract_class.json";
  const casmPath = "./contracts/target/dev/intidapp_inti_progress.compiled_contract_class.json";

  if (!fs.existsSync(sierraPath) || !fs.existsSync(casmPath)) {
    console.error("❌ ERROR: Archivos del contrato no encontrados");
    console.error("\n📝 Compila el contrato primero:");
    console.error("   cd contracts");
    console.error("   scarb build\n");
    process.exit(1);
  }

  const sierraCode = JSON.parse(fs.readFileSync(sierraPath, "utf-8"));
  const casmCode = JSON.parse(fs.readFileSync(casmPath, "utf-8"));

  console.log("✅ Archivos del contrato cargados\n");

  // 5. Declarar el contrato en Starknet
  console.log("📤 Declarando contrato en Starknet...");
  console.log("   (Esto puede tomar 30-60 segundos)\n");

  try {
    const declareResponse = await account.declare({
      contract: sierraCode,
      casm: casmCode,
    });

    console.log("⏳ Esperando confirmación de declaración...");
    await provider.waitForTransaction(declareResponse.transaction_hash);

    const classHash = declareResponse.class_hash;
    console.log("✅ Contrato declarado exitosamente");
    console.log(`   Class Hash: ${classHash}`);
    console.log(`   TX Hash: ${declareResponse.transaction_hash}\n`);

    // 6. Desplegar el contrato
    console.log("🚀 Desplegando contrato...");
    console.log("   (Esto puede tomar 30-60 segundos)\n");

    const deployResponse = await account.deployContract({
      classHash: classHash,
    });

    console.log("⏳ Esperando confirmación de despliegue...");
    await provider.waitForTransaction(deployResponse.transaction_hash);

    console.log("\n╔═══════════════════════════════════════════════════════════╗");
    console.log("║                                                           ║");
    console.log("║        🎉 ¡CONTRATO DESPLEGADO EXITOSAMENTE! 🎉          ║");
    console.log("║                                                           ║");
    console.log("╚═══════════════════════════════════════════════════════════╝\n");

    console.log("📍 Contract Address:");
    console.log(`   ${deployResponse.contract_address}\n`);

    console.log("🔗 Ver en el explorador:");
    console.log(`   https://sepolia.voyager.online/contract/${deployResponse.contract_address}\n`);

    console.log("📝 SIGUIENTE PASO:");
    console.log("   1. Copia el Contract Address de arriba");
    console.log("   2. Abre: frontend/app/page.tsx");
    console.log("   3. Reemplaza CONTRACT_ADDRESS con tu dirección");
    console.log(`   4. Debería quedar: const CONTRACT_ADDRESS = "${deployResponse.contract_address}";\n`);

    console.log("💾 Guardando dirección del contrato...");
    fs.writeFileSync(
      "./deployed-contract.json",
      JSON.stringify(
        {
          network: "sepolia",
          contractAddress: deployResponse.contract_address,
          classHash: classHash,
          deployTxHash: deployResponse.transaction_hash,
          timestamp: new Date().toISOString(),
        },
        null,
        2
      )
    );
    console.log("✅ Guardado en deployed-contract.json\n");

  } catch (error: any) {
    console.error("\n❌ ERROR durante el despliegue:");
    
    if (error.message?.includes("InsufficientAccountBalance")) {
      console.error("\n💰 Fondos insuficientes");
      console.error("   Ve al faucet: https://starknet-faucet.vercel.app/");
      console.error("   Solicita más STRK para tu wallet\n");
    } else if (error.message?.includes("ClassAlreadyDeclared")) {
      console.error("\n⚠️  El contrato ya fue declarado anteriormente");
      console.error("   Esto es normal. Intenta desplegarlo directamente.\n");
    } else {
      console.error(error.message || error);
    }
    
    process.exit(1);
  }
}

main()
  .then(() => {
    console.log("✅ Script completado exitosamente\n");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Error fatal:", error);
    process.exit(1);
  });
