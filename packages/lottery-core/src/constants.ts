// TODO: Need to be moved to outside to json file and used as dynamic import
export const IS_TESTNET = true;
export const CONTRACT_ADDRESS = 'EQAndtP8cSPSkwlFK-lPMBYKDYMxsNUydc6yCiJcjnBuEfeO';
export const TON_CLIENT_API_KEY = 'f74dc0225ef2f2dd07d1afcce76ac62b2a7667ce8810702c8552d99a184317f5';
export const TON_CLIENT_ENDPOINT = IS_TESTNET
  ? 'https://testnet.toncenter.com/api/v2/jsonRPC'
  : 'https://toncenter.com/api/v2/jsonRPC';
