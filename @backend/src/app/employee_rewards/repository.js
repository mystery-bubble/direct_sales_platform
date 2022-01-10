const mongoose = require("mongoose")
const _ = require("lodash")

const EmployeeRewards = mongoose.model("EmployeeRewards")

const saveEmployeeRewards = async ( employee_id, data ) => {
  data.employee_id = employee_id
  let rewards = new EmployeeRewards( data )
  return await rewards.save()
}

const updateEmployeeRewards = async ( rewards, data ) => {
  let { balance, last_month_reward, monthly_point, total_point } = data
  let current = rewards

  _.assign( current, {
    balance: balance || current.balance,
    last_month_reward: last_month_reward || current.last_month_reward,
    monthly_point: monthly_point || current.monthly_point,
    total_point: total_point || current.total_point
  })

  return await current.save()
}

const removeEmployeeRewards = async relations => await relations.remove()

const findEmployeeRewardsByObjectId = async id => await EmployeeRewards.findById( id )

const findEmployeeRewardsByEmployee = async eid => await EmployeeRewards.findOne( { employee_id: eid } )

module.exports = {
  saveEmployeeRewards,
  updateEmployeeRewards,
  removeEmployeeRewards,
  findEmployeeRewardsByObjectId,
  findEmployeeRewardsByEmployee
}