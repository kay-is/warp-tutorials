const handle = (state, action) => {
  if (!action.input.function)
    throw new ContractError("[handle] action.input.function is required")
  if (!handlers[action.input.function])
    throw new ContractError(
      `[handle] Function "${action.input.function}" not found`
    )
  return handlers[action.input.function](state, action)
}

const handlers = {
  postMessage: (state, action) => {
    if (!action.input.content)
      throw new ContractError("[postMessage] action.input.content is required")
    state.messages.push({
      id: state.messages.length + 1,
      creator: action.caller,
      content: action.input.content,
      votes: { addresses: [], status: 0 },
    })
    return { state }
  },
  upvoteMessage: (state, action) => {
    const message = state.messages.find(
      (message) => message.id == action.input.id
    )
    if (!message)
      throw new ContractError(
        `[upvoteMessage] Message "${action.input.id}" not found`
      )
    if (action.caller == message.creator)
      throw new ContractError(
        "[upvoteMessage] Message creator cannot vote for own message"
      )
    if (message.votes.addresses.includes(action.caller))
      throw new ContractError(
        `[upvoteMessage] Caller "${action.caller}" already voted`
      )
    message.votes.status++
    message.votes.addresses.push(action.caller)
    return { state }
  },
  downvoteMessage: (state, action) => {
    const message = state.messages.find(
      (message) => (message.id = action.input.id)
    )
    if (!message)
      throw new ContractError(
        `[downvoteMessage] Message "${action.input.id}" not found`
      )
    if (action.caller == message.creator)
      throw new ContractError(
        "[downvoteMessage] Message creator cannot vote for own message"
      )
    if (message.votes.addresses.includes(action.caller))
      throw new ContractError(
        `[downvoteMessage] Caller "${action.caller}" already voted`
      )
    message.votes.status--
    message.votes.addresses.push(action.caller)
    return { state }
  },
  readMessage: (state, action) => {
    const message = state.messages.find((m) => m.id == action.input.id)
    if (!message)
      throw new ContractError(
        `[readMessage] Message "${action.input.id}" not found`
      )
    return { result: message }
  },
}
