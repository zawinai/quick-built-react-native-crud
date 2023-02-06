export type Tnote = {
  id: string | number[];
  name: string;
};

export type initialT = {
  note: Tnote[] | [];
  setNote: React.Dispatch<React.SetStateAction<Tnote[] | []>>;
  handleAddNote: (val: string) => void;
  handleEdit: (id: string, val: string) => void;
  handleDelete: (id: string) => void;
  loading: boolean;
  error: string | null;
};
