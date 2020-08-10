/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 *
 * Splits addresses into main and normal addresses
 *
 * @param addresses
 * @returns Array
 */
export const splitAddresses = (addresses: Array<any>) => {
  const mainAddress = addresses.filter(item => item["mainAddress"] === true);
  const overSpill = mainAddress.filter((item, index) => index > 0);

  if (mainAddress.length > 0) {
    const normalAddresses = addresses.filter(
      item => item["mainAddress"] === false
    );

    if (overSpill.length > 0) {
      for (const item of overSpill) {
        normalAddresses.push(item);
      }
    }

    return {
      mainAddress: { ...mainAddress[0] },
      normalAddresses
    };
  }

  const normalAddresses = addresses.filter((item, index) => index > 0);
  return {
    mainAddress: { ...addresses[0] },
    normalAddresses
  };
};
