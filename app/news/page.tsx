

export default async function Page({ searchParams }: { searchParams: { tag: string } }) {
  return (
    <div>
      <h1>Tag: {searchParams.tag}</h1>
    </div>)
}
