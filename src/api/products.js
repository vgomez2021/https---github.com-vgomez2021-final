useEffect(() => {
  const loadData = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products/category/jewelery");
      if (!res.ok) throw new Error("Error al cargar productos");
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  loadData();
}, []);

