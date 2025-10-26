import { RpcProvider, Contract } from "starknet";
import dotenv from "dotenv";

dotenv.config();

async function checkBalance() {
  const provider = new RpcProvider({
    nodeUrl: "https://starknet-sepolia.public.blastapi.io",
  });

  const accountAddress = process.env.DEPLOYER_ADDRESS;
  
  if (!accountAddress) {
    console.error("❌ No se encontró DEPLOYER_ADDRESS en .env");
    process.exit(1);
  }

  console.log("\n🔍 Verificando balance de tu wallet...\n");
  console.log(`📍 Dirección: ${accountAddress}\n`);

  // ETH contract en Sepolia
  const ethAddress = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
  
  const ethContract = new Contract(
    [
      {
        name: "balanceOf",
        type: "function",
        inputs: [{ name: "account", type: "felt" }],
        outputs: [{ name: "balance", type: "Uint256" }],
        stateMutability: "view",
      },
    ],
    ethAddress,
    provider
  );

  try {
    const balance = await ethContract.balanceOf(accountAddress);
    console.log("   Balance raw:", balance);
    
    // Convertir Uint256 a número
    let balanceNum = 0;
    if (typeof balance === 'object' && 'low' in balance && 'high' in balance) {
      balanceNum = Number(balance.low) + Number(balance.high) * 2**128;
    } else if (typeof balance === 'bigint') {
      balanceNum = Number(balance);
    } else {
      balanceNum = Number(balance);
    }
    
    const balanceInEth = balanceNum / 1e18;
    
    console.log(`💰 Balance: ${balanceInEth.toFixed(6)} ETH\n`);
    
    if (balanceInEth === 0 || isNaN(balanceInEth)) {
      console.log("⚠️  ¡Tu wallet está vacía!\n");
      console.log("🎁 Solicita fondos gratis aquí:");
      console.log("   → https://blastapi.io/faucets/starknet-sepolia-eth");
      console.log("   → https://starknet-faucet.vercel.app/\n");
    } else {
      console.log("✅ Tienes fondos suficientes para desplegar\n");
    }

    // Verificar si la cuenta está desplegada
    console.log("🔍 Verificando si la cuenta está desplegada...\n");
    try {
      await provider.getClassHashAt(accountAddress);
      console.log("✅ Tu cuenta YA está desplegada");
      console.log("   Puedes ejecutar: npx tsx deploy.ts\n");
    } catch (error: any) {
      if (error.message?.includes("Contract not found")) {
        console.log("⚠️  Tu cuenta NO está desplegada todavía");
        if (balanceInEth > 0) {
          console.log("   Ejecuta: npx tsx deploy-account.ts\n");
        }
      }
    }

  } catch (error: any) {
    console.error("❌ Error:", error.message);
  }
}

checkBalance();
