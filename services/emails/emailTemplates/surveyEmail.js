const keys = require('../../../config/keys');
module.exports = (survey) => {
  return `
    <html>
      <body>
        <h2>We'll like your feedback</h1>
        <p>Please answer the following question:</p>
        <p>${survey.body}</p>
        <div>
          <a href="${keys.redirectDomain}/surveys/${survey.id}/yes">Yes</a>
        </div>
        <div>
          <a href="${keys.redirectDomain}/surveys/${survey.id}/no">No</a>
        </div>
      </body>
    </html>

  `;
};
