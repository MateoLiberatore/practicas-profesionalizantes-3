import React from "react";
import { Link } from "react-router-dom";
import docs from "../api/docs/docs"

function ApiDocs() {
  const documentationJson = docs; 

  return (
    <div className="page-container">
      <div className="nav-bar">
        <h1 className="nav-title">API Documentation</h1>
        <Link to="/" className="btn-secondary">
          ← Back to Landing
        </Link>
      </div>

      <div className="card w-full max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-primary-200">{documentationJson.apiName}  {documentationJson.version}</h2>
        <p className="text-secondary-400 mb-6">{documentationJson.description}</p>
        
        <div className="space-y-6">
          {documentationJson.endpoints.map((endpoint, index) => (
            <div key={index} className="bg-secondary-600 p-4 rounded-xl shadow-inner">
              <h3 className={`text-2xl font-semibold mb-2 ${endpoint.method === 'POST' ? 'text-terciary-400' : 'text-primary-400'}`}>
                <span className="mr-2 font-mono uppercase text-lg p-1 rounded bg-secondary-800 text-primary-300">{endpoint.method}</span>
                {endpoint.path}
              </h3>
              <p className="text-primary-300 mb-2">{endpoint.summary} (Security: {endpoint.security})</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                
                <div className="bg-secondary-800 p-3 rounded">
                    <h4 className="font-bold text-primary-200 mb-1">Body/Headers (Request)</h4>
                    <pre className="whitespace-pre-wrap text-secondary-400 text-md overflow-auto">
                        {JSON.stringify(endpoint.request, null, 2)}
                    </pre>
                </div>

                <div className="bg-secondary-800 p-3 rounded">
                    <h4 className="font-bold text-primary-200 mb-1">Response Codes:</h4>
                    {Object.entries(endpoint.response).map(([code, res]) => (
                        <div key={code} className="mb-2">
                            <span className="font-bold mr-1 text-primary-500">{code}:</span>
                            <span className="text-secondary-400">{res.description}</span>
                        </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ApiDocs;