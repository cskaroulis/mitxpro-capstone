import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AppContext } from "../../common/context";
import { getAccounts } from "./functions/getAccounts";

import "milligram";

import { Breadcrumb, BreadcrumbItem } from "../../common/breadcrumbs";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const contextMgr = useContext(AppContext);

  // get data
  useEffect(() => {
    let mounted = true;
    const {
      user: { userAccountId },
      token,
    } = contextMgr;
    getAccounts(userAccountId, token).then((response) => {
      const { bankingAccounts } = response;
      if (mounted) {
        setAccounts(bankingAccounts);
      }
    });
    return () => (mounted = false);
  }, [contextMgr]);

  // currency formatter
  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const centerCell = { textAlign: "center" };

  return (
    <>
      <section className="container" id="accounts">
        <h1>Accounts</h1>
        <Breadcrumb>
          <BreadcrumbItem to="/new-account">New Account</BreadcrumbItem>
          <BreadcrumbItem to="/transactions">Transactions</BreadcrumbItem>
        </Breadcrumb>
        <table>
          <thead>
            <tr>
              <th>Account Name</th>
              <th>Account Type</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, ndx) => (
              <tr key={ndx}>
                <td>
                  <Link
                    to={{
                      pathname: "/transactions",
                      state: { bankingAccountId: account.bankingAccountId },
                    }}
                  >
                    Family Checking
                  </Link>
                </td>
                <td style={centerCell}>{account.type}</td>
                <td>{currency.format(account.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};
export default Accounts;