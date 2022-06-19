export const getUsers = `fetch("{baseURL}/users", {
    method: "POST",
})`;

export const getUser = `fetch("{baseURL}/users/123123123", {
    method: "POST",
})`;

export const postAddUser = `fetch("{baseURL}/users/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      userId: "678678678",
      accountIds: ["133","788"]
    }
})`;

export const deleteUsers = `fetch("{baseURL}/users/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      userId: "678678678",
    }
})`;

export const putCredit = `fetch("{baseURL}/accounts/credit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      accountId: "678",
      amount: 5000
    }
})`;

export const putTransfer = `fetch("{baseURL}/accounts/transfer", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      fromAccId: "678",
      toAccId: "123",
      amount: 5000
    }
})`;
