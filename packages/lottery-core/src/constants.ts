// TODO: Need to be moved to outside to json file and used as dynamic import
export const IS_TESTNET = false;
export const CONTRACT_ADDRESS = 'EQCgV1CBuvipGWc65T63hVelgmRg5lAhKD2iudEr1_fMwctt';
export const TON_CLIENT_API_KEY = '2c437893fc3f19d3f6d682f1822937770c44c851c366a20d49b9e35b5d518e0d';
export const TON_CLIENT_ENDPOINT = IS_TESTNET
  ? 'https://testnet.toncenter.com/api/v2/jsonRPC'
  : 'https://toncenter.com/api/v2/jsonRPC';
