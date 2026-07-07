import { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const [usersRes, productsRes, ordersRes] = await Promise.all([
      fetch('/api/users'),
      fetch('/api/products'),
      fetch('/api/orders'),
    ]);

    const usersData = await usersRes.json();
    const productsData = await productsRes.json();
    const ordersData = await ordersRes.json();

    setUsers(usersData.data || []);
    setProducts(productsData.data || []);
    setOrders(ordersData.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f8fafc', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <header style={{ background: '#111827', borderRadius: '16px', padding: '24px', marginBottom: '20px' }}>
          <h1 style={{ margin: '0 0 8px', fontSize: '32px' }}>Store Dashboard</h1>
          <p style={{ margin: 0, color: '#94a3b8' }}>Manage users, products, and orders from dedicated pages.</p>
          <nav style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <Link to="/users" style={navLinkStyle}>Users</Link>
            <Link to="/products" style={navLinkStyle}>Products</Link>
            <Link to="/orders" style={navLinkStyle}>Orders</Link>
          </nav>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <div style={{ background: 'linear-gradient(135deg, #38bdf8, #2563eb)', borderRadius: '16px', padding: '18px' }}>
            <p style={{ margin: 0, fontSize: '14px', textTransform: 'uppercase', opacity: 0.8 }}>Users</p>
            <p style={{ margin: '8px 0 0', fontSize: '28px', fontWeight: 700 }}>{users.length}</p>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #d946ef, #9333ea)', borderRadius: '16px', padding: '18px' }}>
            <p style={{ margin: 0, fontSize: '14px', textTransform: 'uppercase', opacity: 0.8 }}>Products</p>
            <p style={{ margin: '8px 0 0', fontSize: '28px', fontWeight: 700 }}>{products.length}</p>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #34d399, #0f766e)', borderRadius: '16px', padding: '18px' }}>
            <p style={{ margin: 0, fontSize: '14px', textTransform: 'uppercase', opacity: 0.8 }}>Orders</p>
            <p style={{ margin: '8px 0 0', fontSize: '28px', fontWeight: 700 }}>{orders.length}</p>
          </div>
        </section>

        <Routes>
          <Route path="/" element={<Home navigate={navigate} />} />
          <Route path="/users" element={<UsersPage users={users} setUsers={setUsers} />} />
          <Route path="/products" element={<ProductsPage products={products} setProducts={setProducts} />} />
          <Route path="/orders" element={<OrdersPage orders={orders} setOrders={setOrders} users={users} products={products} />} />
        </Routes>
      </div>
    </div>
  );
}

function Home({ navigate }) {
  return (
    <div style={{ background: '#111827', borderRadius: '16px', padding: '24px' }}>
      <h2 style={{ marginTop: 0 }}>Welcome</h2>
      <p style={{ color: '#94a3b8' }}>Choose a section to manage your store data.</p>
      <button onClick={() => navigate('/users')} style={buttonStyle}>Go to Users</button>
    </div>
  );
}

function UsersPage({ users, setUsers }) {
  const [form, setForm] = useState({ name: '', email: '', role: 'Customer' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (response.ok) {
      setUsers((prev) => [...prev, data.data]);
      setForm({ name: '', email: '', role: 'Customer' });
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`/api/users/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setUsers((prev) => prev.filter((user) => user._id !== id));
    }
  };

  return (
    <div style={{ background: '#111827', borderRadius: '16px', padding: '20px' }}>
      <h2 style={{ marginTop: 0 }}>Users</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', marginBottom: '14px' }}>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" style={inputStyle} />
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" style={inputStyle} />
        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} style={inputStyle}>
          <option>Customer</option>
          <option>Admin</option>
        </select>
        <button type="submit" style={buttonStyle}>Add User</button>
      </form>
      {users.map((user) => (
        <div key={user._id} style={itemStyle}>
          <div>
            <strong>{user.name}</strong>
            <div style={{ color: '#94a3b8', fontSize: '14px' }}>{user.email}</div>
          </div>
          <button onClick={() => handleDelete(user._id)} style={deleteStyle}>Delete</button>
        </div>
      ))}
    </div>
  );
}

function ProductsPage({ products, setProducts }) {
  const [form, setForm] = useState({ name: '', price: '', stock: '', category: 'General' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (response.ok) {
      setProducts((prev) => [...prev, data.data]);
      setForm({ name: '', price: '', stock: '', category: 'General' });
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setProducts((prev) => prev.filter((product) => product._id !== id));
    }
  };

  return (
    <div style={{ background: '#111827', borderRadius: '16px', padding: '20px' }}>
      <h2 style={{ marginTop: 0 }}>Products</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', marginBottom: '14px' }}>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product Name" style={inputStyle} />
        <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price" style={inputStyle} />
        <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="Stock" style={inputStyle} />
        <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category" style={inputStyle} />
        <button type="submit" style={buttonStyle}>Add Product</button>
      </form>
      {products.map((product) => (
        <div key={product._id} style={itemStyle}>
          <div>
            <strong>{product.name}</strong>
            <div style={{ color: '#94a3b8', fontSize: '14px' }}>${product.price} • {product.stock} in stock</div>
          </div>
          <button onClick={() => handleDelete(product._id)} style={deleteStyle}>Delete</button>
        </div>
      ))}
    </div>
  );
}

function OrdersPage({ orders, setOrders, users, products }) {
  const [form, setForm] = useState({ userId: '', productId: '', quantity: '1', status: 'Pending' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (response.ok) {
      setOrders((prev) => [...prev, data.data]);
      setForm({ userId: '', productId: '', quantity: '1', status: 'Pending' });
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setOrders((prev) => prev.filter((order) => order._id !== id));
    }
  };

  return (
    <div style={{ background: '#111827', borderRadius: '16px', padding: '20px' }}>
      <h2 style={{ marginTop: 0 }}>Orders</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', marginBottom: '14px' }}>
        <input value={form.userId} onChange={(e) => setForm({ ...form, userId: e.target.value })} placeholder="User ID" style={inputStyle} />
        <input value={form.productId} onChange={(e) => setForm({ ...form, productId: e.target.value })} placeholder="Product ID" style={inputStyle} />
        <input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} placeholder="Quantity" style={inputStyle} />
        <input value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} placeholder="Status" style={inputStyle} />
        <button type="submit" style={buttonStyle}>Place Order</button>
      </form>
      {orders.map((order) => (
        <div key={order._id} style={itemStyle}>
          <div>
            <strong>Order #{order._id.slice(-4)}</strong>
            <div style={{ color: '#94a3b8', fontSize: '14px' }}>${order.total} • {order.status}</div>
          </div>
          <button onClick={() => handleDelete(order._id)} style={deleteStyle}>Delete</button>
        </div>
      ))}
    </div>
  );
}

const inputStyle = {
  padding: '10px 12px',
  borderRadius: '10px',
  border: '1px solid #334155',
  background: '#020617',
  color: '#f8fafc',
};

const buttonStyle = {
  padding: '10px 12px',
  borderRadius: '10px',
  border: 'none',
  background: '#38bdf8',
  color: '#082f49',
  fontWeight: 700,
  cursor: 'pointer',
};

const deleteStyle = {
  padding: '8px 10px',
  borderRadius: '8px',
  border: 'none',
  background: '#ef4444',
  color: 'white',
  cursor: 'pointer',
};

const itemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#020617',
  padding: '10px 12px',
  borderRadius: '10px',
  marginBottom: '8px',
};

const navLinkStyle = {
  color: '#38bdf8',
  textDecoration: 'none',
  fontWeight: 700,
};

export default App;
