export function defangIPaddr(address: string): string {
  return address.replace(/\./g, '[.]')
};

export const inputs = [ "122.134.112.11" ]