import React, { useState } from "react";
import { addPet } from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function AddPet() {
  const [form, setForm] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addPet(form);
      alert("✅ Thêm pet thành công!");
      navigate("/dashboard");
    } catch (err) {
      alert("❌ Lỗi khi thêm pet. Vui lòng thử lại.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card">
          <h2>Thêm Pet Mới</h2>
          <form
            onSubmit={handleSubmit}
            style={{ maxWidth: "500px", margin: "0 auto" }}
          >
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#4a5568",
                }}
              >
                Tên Pet:
              </label>
              <input
                placeholder="Nhập tên pet"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                disabled={loading}
                style={{ width: "100%" }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#4a5568",
                }}
              >
                Loài:
              </label>
              <select
                value={form.species}
                onChange={(e) => setForm({ ...form, species: e.target.value })}
                required
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              >
                <option value="">Chọn loài</option>
                <option value="dog">Chó</option>
                <option value="cat">Mèo</option>
                <option value="bird">Chim</option>
                <option value="rabbit">Thỏ</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#4a5568",
                }}
              >
                Giống:
              </label>
              <input
                placeholder="Nhập giống"
                value={form.breed}
                onChange={(e) => setForm({ ...form, breed: e.target.value })}
                required
                disabled={loading}
                style={{ width: "100%" }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#4a5568",
                }}
              >
                Tuổi (năm):
              </label>
              <input
                placeholder="Tuổi"
                type="number"
                min="0"
                max="50"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                required
                disabled={loading}
                style={{ width: "100%" }}
              />
            </div>

            <button type="submit" disabled={loading} style={{ width: "100%" }}>
              {loading ? "Đang thêm..." : "Thêm Pet"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddPet;
