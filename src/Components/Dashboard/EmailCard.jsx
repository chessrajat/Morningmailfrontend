import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const EmailCard = ({subscriber}) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg my-4">
      <p className="">
        <FontAwesomeIcon icon={faEnvelope} />{" "}
        <span className="text-lg px-3">{subscriber.email}</span>
      </p>
      <div className="flex gap-5">
        <p className="bg-blue-600 text-white flex items-center">
          <span className="p-3 bg-blue-700">{subscriber.sent_count}</span>
          <span className="px-2">Sent</span>
        </p>
        <p className="bg-green-600 text-white flex items-center">
          <span className="p-3 bg-green-700">{subscriber.opened_count}</span>
          <span className="px-2">Opened</span>
        </p>
      </div>
    </div>
  );
};

export default EmailCard;
