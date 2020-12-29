import { createContext, createRef, useState } from "react";

export const ProposalContext = createContext();

export const ProposalProvider = (props) => {
  const [proposals, setProposals] = useState([]);
  const [singleProposal, setSingleProposal] = useState({
    customer: { organization: "" },
    proposalitems: [],
  });

  const PdfRef = createRef();

  const getProposals = () => {
    return fetch("http://127.0.0.1:8000/proposals", {
      headers: {
        Authorization: `Token ${localStorage.getItem("quotr_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then(setProposals);
  };

  const getSingleProposal = (selectedProposal) => {
    return fetch(`http://127.0.0.1:8000/proposals/${selectedProposal}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("quotr_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then(setSingleProposal);
  };

  const deleteProposal = (selectedProposal) => {
    return fetch(`http://127.0.0.1:8000/proposals/${selectedProposal}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("quotr_user_id")}`,
      },
      body: JSON.stringify(selectedProposal),
    }).then(getProposals);
  };

  const deleteProposalItem = (checkedProposalItem) => {
    return fetch(`http://127.0.0.1:8000/proposalitems/${checkedProposalItem}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("quotr_user_id")}`,
      },
      body: JSON.stringify(checkedProposalItem),
    });
    //   .then(getSingleProposal);
  };

  const createProposal = (newProposal) => {
    return fetch(`http://127.0.0.1:8000/proposals`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("quotr_user_id")}`,
      },
      body: JSON.stringify(newProposal),
    })
      .then(getProposals);
  };

  return (
    <ProposalContext.Provider
      value={{
        getProposals,
        proposals,
        setProposals,
        getSingleProposal,
        setSingleProposal,
        singleProposal,
        deleteProposal,
        deleteProposalItem,
        createProposal,
        PdfRef
      }}
    >
      {props.children}
    </ProposalContext.Provider>
  );
};
