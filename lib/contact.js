// Single source of truth for where messages go.
export const CONTACT = {
  email: 'banukananayak@gmail.com',
  // Web3Forms access key. Public by design (it only allows posting to this inbox); override with NEXT_PUBLIC_WEB3FORMS_KEY.
  accessKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'e95a1dde-03a1-44e7-9d92-b8ac98f2664a',
  endpoint: 'https://api.web3forms.com/submit',
};
