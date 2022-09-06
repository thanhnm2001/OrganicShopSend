import { Category } from "@material-ui/icons";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./product.css";

export default function Product() {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    const [listCategory, setListCategory] = useState([]);
    const { productId } = useParams();
    const [createdDate, setCreatedDate] = useState();
    const [category, setCategory] = useState();
    const [id, setId] = useState();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();
    const handleChangeSelect = (e) => {
        setCategory(listCategory[e.target.value])
    }
    const handleSelectFile = (e) => {
        setImage(e.target.files[0].name)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const test = { "id": id, "name": name, "price": price, "weight": weight, "image": image, "description": description, "status": true, "createddate": createdDate, "category": category }
        axios.put(`http://localhost:8080/product/${productId}`, test, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(res => {
                navigate('/admin/products')
            })

    }




    useEffect(() => {
        axios.get('http://localhost:8080/category', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(res => {
                setListCategory(res.data)

                setCategory(res.data[0])




            });
        axios.get(`http://localhost:8080/product/${productId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(res => {
                setName(res.data.name)
                setPrice(res.data.price)
                setWeight(res.data.weight)
                setDescription(res.data.description)
                setCreatedDate(res.data.createddate)
                setId(res.data.id);
                setImage(res.data.image)

            })




    }, [])

    return (
        <div className="newProduct">
            <h1 className="addProductTitle">Edit Product</h1>
            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                </div>
                <div className="addProductItem">
                    <label>Image</label>
                    <input onChange={handleSelectFile} type="file" id="file" />
                </div>

                <div className="addProductItem">
                    <label>Price</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
                </div>
                <div className="addProductItem">
                    <label>Weight</label>
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight" />
                </div>
                <div className="addProductItem">
                    <label>Description</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                </div>
                <div className="addProductItem">
                    <label>Category</label>
                    <select onChange={handleChangeSelect}>
                        {listCategory.map((option, index) => (
                            <option key={index} value={index}>{option.name}</option>
                        ))}
                    </select>

                </div>
                <button onClick={handleSubmit} className="addProductButton">Update</button>
            </form>
        </div >
    );
}
