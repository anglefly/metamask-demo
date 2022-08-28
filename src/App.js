import "./App.scss";
import getAccountInfo from "./getAccountInfo";

function App() {
  const { accountAndBalanceList, connectMetamask } = getAccountInfo();

  return (
    <div className="App">
      <div className="count-container">
        <h3>your account and balance</h3>
        {accountAndBalanceList.map((i) => (
          <div className="account-balance-item">
            <div>
              <span>account: {i.account}</span>
            </div>
            <div>
              <span>balance: {i.balance}</span>
            </div>
          </div>
        ))}
      </div>
      <p>
        <button onClick={connectMetamask}>get balance of metamask</button>
      </p>
    </div>
  );
}
export default App;
