function tryParseInt(height: string, name: string = "argument value"): number {
  try {
    const v = Number(height);
    if (!isNaN(v)) {
      return v;
    } else {
      throw new Error();
    }
  } catch {
    throw new Error(`Error parsing ${name}`);
  }
}

export { tryParseInt };
