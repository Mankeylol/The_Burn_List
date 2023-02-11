import { Metaplex } from "@metaplex-foundation/js";
import { Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

const solana_connection = new Connection(
  "https://special-responsive-dinghy.solana-mainnet.discover.quiknode.pro/5158345c25d3630b3f69ba4d4b524822351941b1/"
);
const metaplex = new Metaplex(solana_connection);
const wallet = "4Jr36dU7y6XxWwFeANMRAhCJNm4ZqvWxTQEV4WmZLtif";

const filters = [
  {
    //limiting the size to 165 - filtering
    dataSize: 165,
  },

  {
    //memory comparison - in 165 bytes at byte 32 we start(wallets start at 32nd place)
    memcmp: {
      offset: 32,
      bytes: wallet,
    },
  },
];

const tokenAccounts = await solana_connection.getParsedProgramAccounts(
  TOKEN_PROGRAM_ID,
  { filters }
);

tokenAccounts.forEach(async (account, i) => {
  const parsedAccountInfo = account.account.data;
  //@ts-ignore
  const mintAddress = parsedAccountInfo?.parsed?.info?.mint;
  //@ts-ignore
  const tokenBalance = parsedAccountInfo?.parsed?.info?.tokenAmount?.uiAmount;
  console.log(`Token Acccount No. ${i + i}: ${account.pubkey.toString()}`);
  console.log(`--Token Mint ID: ${mintAddress}`);
  console.log(`--Token Balance: ${tokenBalance}\n`);

  const nfts = [];

  nfts.push(mintAddress);
  console.log(nfts);
  // const nft = await metaplex.nfts().findByMint({ mintAddress });

  // console.log(nft.json, nft.creators);
});
