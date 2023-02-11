import { Connection, GetProgramAccountsFilter } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
// import axios from "axios";
// import { Metaplex } from "@metaplex-foundation/js";

const wallet = "4Jr36dU7y6XxWwFeANMRAhCJNm4ZqvWxTQEV4WmZLtif";

export async function getMintAddress() {
  //hide this endpoint during production
  const solana_connection = new Connection(
    "https://special-responsive-dinghy.solana-mainnet.discover.quiknode.pro/5158345c25d3630b3f69ba4d4b524822351941b1/"
  );

  const filters: GetProgramAccountsFilter[] = [
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

    // const metaplex = new Metaplex(solana_connection);
    // const nft = await metaplex.nfts().findByMint({ mintAddress });
  });
}

getMintAddress();

// (async () => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   const data = {
//     jsonrpc: "2.0",
//     id: 1,
//     method: "qn_fetchNFTsByCreator",
//     params: [
//       {
//         creator: "4Jr36dU7y6XxWwFeANMRAhCJNm4ZqvWxTQEV4WmZLtif",
//         page: 1,
//         perPage: 3,
//       },
//     ],
//   };

//   await axios
//     .post(
//       "https://special-responsive-dinghy.solana-mainnet.discover.quiknode.pro/5158345c25d3630b3f69ba4d4b524822351941b1/",
//       data,
//       config
//     )
//     .then(function (response) {
//       // handle success
//       console.log(response.data);
//     })
//     .catch((err) => {
//       // handle error
//       console.log(err);
//     });
// })();
