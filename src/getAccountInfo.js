import { useState } from "react";
import Web3 from "web3";

export default function () {
  let [accountAndBalanceList, setAccountAndBalanceList] = useState([]);

  const connectMetamask = async () => {
    if (
      typeof window.ethereum !== "undefined" ||
      typeof window.web3 !== "undefined"
    ) {
      const provider = window.ethereum;
      let web3 = new Web3(provider);
      window.web3 = web3;
      const netIsNormal = await web3.eth.net.isListening();
      if (netIsNormal) {
        const accountList = await web3.eth.getAccounts();
        const accountAndBalanceList = await Promise.all(
          accountList.map((i) => web3.eth.getBalance(i))
        ).then((result) => {
          return result.map((j, index) => ({
            account: accountList[index],
            balance: web3.utils.fromWei(j),
          }));
        });
        setAccountAndBalanceList(accountAndBalanceList);
        console.log("accountAndBalanceList", accountAndBalanceList);
      } else {
        alert(
          "Please check that the network is normal or the MetaMask wallet plug-in is normal"
        );
      }
    } else {
      // alert("Please install the MetaMask wallet plugin");
      let gotoTarget = "https://metamask.io/download/";
      if (navigator.userAgent.indexOf("Firefox") > 0) {
        gotoTarget =
          "https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/";
      } else if (navigator.userAgent.indexOf("Edge") > -1) {
        gotoTarget =
          "https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm";
      } else if (
        navigator.userAgent.indexOf("Chrome") > -1 &&
        navigator.userAgent.indexOf("Safari") > -1
      ) {
        gotoTarget =
          "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";
      }
      window.open(gotoTarget);
    }
  };
  return { accountAndBalanceList, connectMetamask };
}
