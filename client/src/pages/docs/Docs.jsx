import Example from "../../components/example/Example";
import "./docs.css";

function Docs() {
  return (
    <div className="docs">
      <p className="baseurl">
        Base URL: https://bankoftheyear.herokuapp.com/api/v1
      </p>
      <h3>---Users---</h3>
      <Example method="GET" endpoint="/users" explanation="Get all users" />
      <Example
        method="GET"
        endpoint="/users/:id"
        explanation="Get a user by ID"
        output={JSON.stringify(
          { id: "123123123", accountIds: ["133", "333"], totalCash: 600 },
          null,
          4
        )}
      />
      <Example
        method="POST"
        endpoint="/users/add"
        explanation="Add a new user given a user ID and an array of account IDs. if the array is empty, a new account will be created with 0 cash and 0 credits"
      />
      <Example
        method="DELETE"
        endpoint="/users/delete"
        explanation="Delete a user by ID via body. User will also be deleted from every account he had. If the account became empty it will be deleted also"
      />
      <h3>---Accounts---</h3>
      <Example
        method="GET"
        endpoint="/accounts"
        explanation="Get all accounts"
      />
      <Example
        method="GET"
        endpoint="/accounts/:id"
        explanation="Get an account by ID"
        output={JSON.stringify(
          { id: "123123123", accountIds: ["133", "333"], totalCash: 600 },
          null,
          4
        )}
      />
      <Example
        method="PUT"
        endpoint="/users/credit"
        explanation="Update account's credit by account ID and amount"
      />
      <Example
        method="PUT"
        endpoint="/users/deposit"
        explanation="Deposit cash to an account by account id and amount"
      />
      <Example
        method="PUT"
        endpoint="/users/withdraw"
        explanation="Withdraw cash from account by account id and amount"
      />
      <Example
        method="PUT"
        endpoint="/users/transfer"
        explanation="Transfer from one account to another"
      />
    </div>
  );
}

export default Docs;
