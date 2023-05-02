import React from 'react';

type ResponseMessageProps = {
  type: "success" | "danger";
  message: string;
}

const ResponseMessage: React.FC<ResponseMessageProps> = ({ type, message }) => {
  if (type === 'success') {
    return (
      <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
        {message}
      </div>
    )
  } else {    
    return (
      <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
        {message}
      </div>
    )
  }
}

export default ResponseMessage