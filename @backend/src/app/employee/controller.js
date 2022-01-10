const _ = require("lodash")
const uuid = require("uuid")

const repository = {
  ...require("./repository"),
  employee_relations: require("../employee_relations/repository"),
  employee_rewards: require("../employee_rewards/repository")
}

exports.create = async ( req, res ) => {
  try {
    const id = req.body.id || uuid.v4()
    const info = _.pick( req.body, [
      "name",
      "email",
      "phone",
      "account",
      "password",
      "rank"
    ])
    const reward = req.body.reward
    const relation = req.body.relation
    let savedEmployee = await repository.saveEmployee( { id, ...info } )
    await repository.employee_relations.saveEmployeeRelations( savedEmployee._id, relation )
    await repository.employee_rewards.saveEmployeeRewards( savedEmployee._id, reward )
    res.success( { "message": "Employee create successfully." } )
  }
  catch ( err ) {
    console.log( err )
    res.send( { err } )
  } 
}

exports.edit = async ( req, res ) => {
  try {
    const type = req.query.type || req.params.type
    const target = await repository.findEmployeeById( req.body.id )
  
    switch( type ) {
      case "info":
        await repository.updateEmployee( target, req.body )
        break
      case "reward":
      case "rewards":
        let target_reward = await repository.employee_rewards.findEmployeeRewardsByEmployee( target._id )
        await repository.employee_rewards.updateEmployeeRewards( target_reward, req.body )
        break
      case "relation":
      case "relations":
        let target_relation = await repository.employee_relations.findEmployeeRelationsByEmployee( target._id )
        await repository.employee_relations.updateEmployeeRelations( target_relation, req.body )
        break
    }
  
    res.success( { "message": "Employee update successfully." } )
  }
  catch ( err ) {
    console.log( err )
    res.send( { err } )
  }
}
exports.remove = async ( req, res ) => {
  try {
    let target = await repository.findEmployeeById( req.body.id )
    let target_reward = await repository.employee_rewards.findEmployeeRewardsByEmployee( target._id )
    let target_relations = await repository.employee_relations.findEmployeeRelationsByEmployee( target._id )

    await repository.removeEmployee( target )
    await repository.employee_rewards.removeEmployeeRewards( target_reward )
    await repository.employee_relations.removeEmployeeRelations( target_relations )

    res.success( { "message": "Employee remove successfully" } ) 
  }
  catch ( err ) {
    console.log( err )
    res.send( { err } )
  }
}

exports.get = async ( req, res ) => {
  try {
    const by = req.query.by || req.params.by
    var result = undefined
  
    switch( by ) {
      case "id":
        result = await repository.findEmployeeById( req.body.id )
        break
      case "phone":
        result = await repository.findEmployeeByPhone( req.body.phone )
        break
      case "email":
        result = await repository.findEmployeeByEmail( req.body.email )
        break
      case "account":
        result = await repository.findEmployeeByAccount( req.body.account )
        break
      case "name":
        result = await repository.findEmployeeByName( req.body.name )
        break
    }

    if ( _.isEmpty( result ) ) {
      res.success( { "message": "Cannot found any results." } )
      return
    }
  
    if ( !Array.isArray( result ) ) {
      // result.reward = await repository.employee_rewards.findEmployeeRewardsByEmployee( result._id )
      Object.assign( result, { "reward": await repository.employee_rewards.findEmployeeRewardsByEmployee( result._id ) } )
      result.relations = await repository.employee_relations.findEmployeeRelationsByEmployee( result._id )
    }
    else {
      for ( let element of result ) {
        element.reward = await repository.employee_rewards.findEmployeeRewardsByEmployee( element._id )
        element.relations = await repository.employee_relations.findEmployeeRelationsByEmployee( element._id )
      }
    }
  
    console.log( result.reward )
    res.success( result )
  }
  catch ( err ) {
    console.log( err )
    res.send( { err } )
  }
}