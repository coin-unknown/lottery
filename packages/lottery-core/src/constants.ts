// TODO: Need to be moved to outside to json file and used as dynamic import
export const IS_TESTNET = false;
export const CONTRACT_ADDRESS = 'EQD_MZ4D8UAbwFC4tCtLi98mM8op2tHtUcVA8gsRMqN7t69K';
export const TON_CLIENT_API_KEY = 'f74dc0225ef2f2dd07d1afcce76ac62b2a7667ce8810702c8552d99a184317f5';
export const TON_CLIENT_ENDPOINT = IS_TESTNET
  ? 'https://testnet.toncenter.com/api/v2/jsonRPC'
  : 'https://toncenter.com/api/v2/jsonRPC';
