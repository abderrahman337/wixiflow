const express = require("express");
const router = express.Router();

const validateAuthorization = require("../../api/auth/validateAuthorization");
const { getAllUsers } = require("../../api/users/getAllUsers");
const { addPlan } = require("../../api/users/addPlan");
const { deleteUser } = require("../../api/users/deleteUser");
const { undoDeleteUser } = require("../../api/users/undoDeleteUser");
/**
 * @router      Metohd : GET   endpoint : api/users
 * @access      Private
 * @return      All users
 */
router.get("/", validateAuthorization, getAllUsers);
/**
 * @router      Metohd : POST   endpoint : api/users/addplan
 * @access      Private
 * @payload     name, plan, total of subscription
 * @return      user
 */
router.post("/addplan", validateAuthorization, addPlan);
/**
 * @router      Metohd : PATCH   endpoint : api/users
 * @access      Private
 * @payload     id
 * @return      user
 */
router.delete("/delete/:id", validateAuthorization, deleteUser);
/**
 * @router      Metohd : PATCH   endpoint : api/users
 * @access      Private
 * @payload     id
 * @return      user
 */
router.patch("/undo-delete", validateAuthorization, undoDeleteUser);

module.exports = router;
