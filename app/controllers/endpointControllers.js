import { allUsers, allSubscribers } from '../config/database.mjs'
import { dynamicSort } from './dataBaseControllers.js'
function addSubscriptionsToUser (allUsers, allSubscribers) {
  const usersWithSubscribtions = []

  allUsers.rows.forEach(element => {
    const userSubscriptions = allSubscribers.rows.filter(el => el.user_id === element.id)
    const userSubscriptionsAllInfo = allUsers.rows
      .filter(el => userSubscriptions.find(user => el.id === user.friend_id))
    usersWithSubscribtions.push({ ...element, subscriptions: userSubscriptionsAllInfo })
  })

  return usersWithSubscribtions
}

const getUserFriends = (userId, allUsers, allSubscribers) => {
  const userSubscribers = allSubscribers.rows.filter(el => el.user_id === userId)
  const userSubscribedOn = allSubscribers.rows.filter(el => el.friend_id === userId)

  const mutualSubscription = userSubscribedOn.filter(user => userSubscribers
    .find(el => el.friend_id === user.user_id))

  const friends = allUsers.rows.filter(user => mutualSubscription
    .find(el => el.user_id === user.id))

  const user = allUsers.rows.filter(el => el.id === userId)
  return [user, friends]
}

export function getUserWithfriends (req, res) {
  const test = {
    userId: +req.params.id,
    orderBy: req.query.order_by,
    orderType: req.query.order_type
  }

  const result = getUserFriends(test.userId, allUsers, allSubscribers)
  const user = result[0][0]
  const friends = result[1]
  const sortFriendsByOrder = friends.sort(dynamicSort(test.orderBy))

  if (test.orderType === 'desc') {
    sortFriendsByOrder.reverse()
  }

  const userWithFriends = { ...user, friends: sortFriendsByOrder }

  res.send(userWithFriends)
}

export function getUsersWithSubscribtions (req, res) {
  res.send(addSubscriptionsToUser(allUsers, allSubscribers))
};

export function topfiveUsers (req, res) {
  const sortedusersWithSubscribtions = addSubscriptionsToUser(allUsers, allSubscribers)
    .sort(function (a, b) {
      if (a.subscriptions.length < b.subscriptions.length) {
        return 1
      }
      if (a.subscriptions.length > b.subscriptions.length) {
        return -1
      }
      return 0
    })

  res.send(sortedusersWithSubscribtions.slice(0, 5))
};

export function usersWithNullSubsciptions (req, res) {
  const sortedusersWithSubscribtions = addSubscriptionsToUser(allUsers, allSubscribers)
    .filter(el => el.subscriptions.length === 0)

  res.send(sortedusersWithSubscribtions)
};
