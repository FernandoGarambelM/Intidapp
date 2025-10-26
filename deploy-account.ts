import { Account, RpcProvider, CallData, hash } from "starknet";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  console.log("\n🚀 DESPLEGANDO CUENTA DE ARGENTX EN SEPOLIA\n");

  const accountAddress = process.env.DEPLOYER_ADDRESS;
  const privateKey = process.env.DEPLOYER_PRIVATE_KEY;

  if (!accountAddress || !privateKey) {
    console.error("❌ ERROR: Configura tu .env primero\n");
    process.exit(1);
  }

  const provider = new RpcProvider({
    nodeUrl: "https://starknet-sepolia.public.blastapi.io",
  });

  console.log("✅ Conectado a Sepolia");
  console.log(`   Dirección: ${accountAddress}\n`);

  // Verificar si la cuenta ya está desplegada
  console.log("🔍 Verificando si la cuenta ya existe...\n");

  try {
    await provider.getClassHashAt(accountAddress);
    console.log("✅ ¡Tu cuenta YA está desplegada!\n");
    console.log("   Puedes ejecutar: npx tsx deploy.ts\n");
    process.exit(0);
  } catch (error: any) {
    if (error.message?.includes("Contract not found")) {
      console.log("⚠️  Cuenta no encontrada. Procediendo a desplegar...\n");
    } else {
      console.error("❌ Error verificando cuenta:", error.message);
      process.exit(1);
    }
  }

  // Crear cuenta para desplegar
  const account = new Account(provider, accountAddress, privateKey, "1");

  console.log("📤 Intentando desplegar cuenta...");
  console.log("   (Esto puede tomar 1-2 minutos)\n");

  try {
    // Para desplegar una cuenta en Starknet, necesitamos el class hash de ArgentX
    // Este es el class hash oficial de ArgentX en Sepolia
    const argentXAccountClassHash = "0x01a736d6ed154502257f02b1ccdf4d9d1089f80811cd6acad48e6b6a9d1f2003";

    // Desplegar la cuenta
    const { transaction_hash } = await account.deployAccount({
      classHash: argentXAccountClassHash,
      constructorCalldata: CallData.compile({
        owner: accountAddress,
        guardian: "0",
      }),
      addressSalt: privateKey,
    });

    console.log("⏳ Esperando confirmación...");
    console.log(`   TX Hash: ${transaction_hash}\n`);

    await provider.waitForTransaction(transaction_hash);

    console.log("\n╔═══════════════════════════════════════════════════════════╗");
    console.log("║                                                           ║");
    console.log("║        🎉 ¡CUENTA DESPLEGADA EXITOSAMENTE! 🎉            ║");
    console.log("║                                                           ║");
    console.log("╚═══════════════════════════════════════════════════════════╝\n");

    console.log("✅ Tu cuenta está activada en Sepolia");
    console.log(`   Dirección: ${accountAddress}\n`);

    console.log("🔗 Ver en el explorador:");
    console.log(`   https://sepolia.voyager.online/contract/${accountAddress}\n`);

    console.log("🚀 SIGUIENTE PASO:");
    console.log("   Ahora puedes desplegar tu contrato IntiDapp:");
    console.log("   npx tsx deploy.ts\n");

  } catch (error: any) {
    console.error("\n❌ ERROR al desplegar cuenta:");

    if (error.message?.includes("InsufficientAccountBalance")) {
      console.error("\n💰 No tienes suficientes fondos");
      console.error("   Ve a un faucet y solicita STRK:");
      console.error("   • https://blastapi.io/faucets/starknet-sepolia-eth");
      console.error("   • https://starknet-faucet.vercel.app/\n");
    } else if (error.message?.includes("AlreadyDeployed")) {
      console.log("\n✅ Tu cuenta ya estaba desplegada");
      console.log("   Puedes ejecutar: npx tsx deploy.ts\n");
    } else {
      console.error(error.message || error);
      console.error("\n💡 INTENTA:");
      console.error("   1. Usar el faucet de Blast API");
      console.error("      (despliega la cuenta automáticamente)");
      console.error("   2. O espera unos minutos y vuelve a intentar\n");
    }

    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error fatal:", error);
    process.exit(1);
  });
