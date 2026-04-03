import ProductoModel from "@/app/model/ProductoModel";

export default async function ProductoTextoPage({ params }: ProductoModel) {
    const { id, texto } = await params;
    return <div>Producto Page {id} - {texto}</div>;
}
