import { createContext, useState } from "react";

export const ProposalContext = createContext();

export const ProposalProvider = (props) => {
  const [proposals, setProposals] = useState([]);
  const [singleProposal, setSingleProposal] = useState({
    customer: { organization: "" },
  });

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

  return (
    <ProposalContext.Provider
      value={{
        getProposals,
        proposals,
        setProposals,
        getSingleProposal,
        setSingleProposal,
        singleProposal,
      }}
    >
      {props.children}
    </ProposalContext.Provider>
  );
};
