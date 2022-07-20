//for now we cannot access nested function by importing parent funtion
// let authentication = false;
// let setAuthentication = () => {
// 	authentication = true;
// 	console.log(authentication);
// };
// 
// let unSetAuthentication = () => {
// 	authentication = false;
// 	console.log(authentication);
// };
// 
// let isAuthenticated = () => {
// 	console.log(authentication);
// 	return authentication;
// };
// 
// export { unSetAuthentication, setAuthentication, isAuthenticated };

const auth = {
	authState: false,
	authType: "",
};
export default auth;

// this is required to tell that we are accessing this object something
// const obj={
// 	authentication: false,
// 	setAuthentication=()=>{
// 		this.authentication = true;
// 	},
// 	unSetAuthentication: function(){
// 		this.authentication = false;
// 	},
// 	isAuthenticated: function (){
// 		return this.authentication;
// 	},
// };
// export default obj
