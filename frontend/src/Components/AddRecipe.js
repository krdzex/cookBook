import React, { useState } from 'react';
import { createRecipe } from '../apiService/recipeApi';
import authHalper from '../auth/authHelper';
import { Redirect, useHistory } from 'react-router';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { closePopUp, openPopUp } from '../Actions';

const AddRecipe = () => {
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        description: "",
        instructions: "",
        categorie: "",
        name: "",
        img: "",
        redirect: false
    })

    const [errors, setErrors] = useState({})

    const onChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const allCategories = [
        "Breakfast",
        "Lunch",
        "Beverages",
        "Appetizers",
        "Soups",
        "Salads",
        "Main dishes: Meat",
        "Main dishes: Seafood",
        "Main dishes: Vegetarian",
        "Side dishes: Vegetables",
        "Side dishes: Other",
        "Desserts",
        "Canning / Freezing",
        "Breads",
        "Holidays",
        "Entertaining"
    ]

    const onReleaseCategorie = () => {
        if (values.categorie === "") {
            setValues({ ...values, categorie: "" })
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("name", values.name)
        for (var i = 0; i < ingredients.length; i++) {
            formData.append('ingredients', ingredients[i]);
        }
        formData.append("description", values.description)
        formData.append("instructions", values.instructions)
        formData.append("categorie", values.categorie)
        formData.append("author", authHalper.isAuthentcated().user._id)
        formData.append("img", values.img)

        createRecipe(formData).then(response => {
            if (response.message) {
                setValues({ ...values, redirect: true })
                dispatch(openPopUp("Successfuly Created Recipe!"))
                setTimeout(() => {
                    dispatch(closePopUp())
                }, 3000);
            } else {
                setErrors(response)
            }
        }).catch(err => console.log(err))
    }
    const onChangeFile = (e) => {
        setValues({ ...values, img: e.target.files[0] })
    }
    const [ingredients, setIngredients] = useState([])
    const [editing, setEditing] = useState(false)
    const [ingredientInput, setIngredientInput] = useState("")
    const onSubmitIngredients = () => {
        if (ingredientInput !== "") {
            setIngredients([...ingredients, ingredientInput])
            setIngredientInput("")
            setErr(false)
        } else {
            setErr(true)
        }
    }

    const onChangeIngredientInput = (e) => {
        setIngredientInput(e.target.value)

    }

    const onDeleteClick = (id) => {
        setIngredients(ingredients.filter((ingredients, i) => i !== id))
    }
    const [updatingId, setUpdatingId] = useState("")
    const onEditClick = (id, name) => {
        setIngredientInput(name)
        setEditing(true)
        setUpdatingId(id)
    }
    const [err, setErr] = useState(false)

    const onCancel = () => {
        setEditing(false);
        setIngredientInput("")
    }

    const onUpdate = () => {
        if (ingredientInput !== "") {
            setIngredients(ingredients.map((ingredient, i) => i === updatingId ? ingredientInput : ingredient))
            setEditing(false);
            setIngredientInput("")
            setErr(false)
        } else {

            setErr(true)
        }
    }

    if (values.redirect) return <Redirect to={"/homePage"} />
    return (
        <div className="singleRecipeWrapper add">
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div className="upperPart add">
                    <div className="singleRecipeLeftSide add">
                        <h2>Recipe image: </h2>
                        <input type="file" name="img" className="addFile" onChange={onChangeFile} />
                        {errors.img && (<span style={{ color: "red" }}>Cant be empty image!</span>)}
                        <div className="ingredients">
                            <div className="listOfIngredients" >
                                <h3>Ingredients</h3>
                                <div className="wrapperAddForm" >
                                    <input type="text" placeholder={!err ? "Add ingredient" : "Cant be empty"} value={ingredientInput} onChange={onChangeIngredientInput} />
                                    <input type="button" value="Submit" onClick={!editing ? () => onSubmitIngredients() : () => onUpdate()} />
                                    {editing && (<input type="button" onClick={() => onCancel()} value="Cancel" className="cancel" />)}
                                </div>
                                <div className={editing ? "ingredientTable editing" : "ingredientTable"} style={errors.ingredients ? { border: "3px solid red" } : {}}>
                                    {editing && (<div className="cover">

                                    </div>)}
                                    <table>
                                        <thead>
                                            <tr>
                                                <td>No</td>
                                                <td>Ingredient</td>
                                                <td>Actions</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ingredients.map((ingredient, id) => (
                                                <tr key={id}>
                                                    <td>{id + 1}</td>
                                                    <td>{ingredient}</td>
                                                    <td><Icon icon="fluent:delete-28-filled" style={{ fontSize: "20px", position: "relative", top: "3px", color: "red", cursor: "pointer" }} onClick={() => onDeleteClick(id)} /> <Icon icon="entypo:edit" style={{ fontSize: "20px", position: "relative", top: "3px", color: "blue", cursor: "pointer" }} onClick={() => onEditClick(id, ingredient)} /></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {errors.ingredients && (<span style={{ color: "red" }}>Cant be empty image!</span>)}
                            </div>
                        </div>
                    </div>
                    <div className="singleRecipeRightSide">
                        <div className="upper">
                            <div className="headerAdd">
                                <h2>Recipe name: </h2>
                                <input type="text" value={values.name} onChange={onChange("name")} style={errors.name ? { border: "3px solid red" } : {}} placeholder={errors.name ? errors.name : ""} />
                            </div>
                            <div className="description">
                                <h3>Description: </h3>
                                <textarea value={values.description} placeholder="Add descriptions" onChange={onChange("description")} placeholder={errors.description ? "Cant be empty" : ""} style={errors.description ? { border: "3px solid red" } : {}}>
                                </textarea>
                            </div>
                        </div>

                        <div className="bottom">
                            <div className="categorie">
                                <h3>Categorie: </h3>
                                <input type="text" list="categorie" placeholder={errors.categorie ? "Cant be empty" : ""} style={errors.categorie ? { border: "3px solid red" } : {}} onMouseDown={() => setValues({ ...values, categorie: "" })} value={values.categorie} onKeyDown={(event) => {
                                    event.preventDefault();
                                }} onChange={onChange("categorie")} onBlur={() => onReleaseCategorie()} />
                                <datalist id="categorie">
                                    {allCategories.map((categorie, id) => {
                                        return <option value={categorie} key={id} />
                                    })}
                                </datalist>
                            </div>
                            <div className="instructions">
                                <h3>Instructions: </h3>
                                <textarea value={values.instructions} placeholder="Add instructions" onChange={onChange("instructions")} style={errors.instructions ? { border: "3px solid red" } : {}} placeholder={errors.name ? "Cant be empty" : ""}>
                                </textarea>
                            </div>
                        </div>
                        <input type="submit" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddRecipe;