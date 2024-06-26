interface HeaderPropsType {
  name: string;
}

export default function Header({ name }: HeaderPropsType) {
  return <h1>{name}</h1>;
}
