async function fetchGraphQL(key) {
  const FLEXHIRE_API_KEY = key;
  const query = `{
      currentUser {
        name,
        avatarUrl,
        answers {
          id
          question{
            id
            title
          }
          optimizedUrl
        }
        timelineEntries {
          id
          institute {
            id
            name
            country
          }
          skills {
            id
            name
            featuredFreelancerTypes {
              id
              name
            }
            
          }
            title
        }
        allChatMessages {
          edges {
            node {
              id,
              chatThread {
                id,
                avatarUrl
              }
            }
          }
        }
        video {
          id,
          available,
          posterUrl,
          public,
          optimizedUrl,
          createdAt,
          question {
            id,
            answersCount
          }
          contractRequests {
            id,
            allowTextualAnswers
          }
        }
        userSkills {
          id,
          experience,
          skill {
            id,
            name,
            rawId,
            featuredFreelancerTypes {
              id
            }
          }
        }
      }
    }`

  const response = await fetch('api/v2', {
    method: 'POST',
    headers: {
      'FLEXHIRE-API-KEY': FLEXHIRE_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query
    }),
  });

  
  if(response.status !== 200) {
    return false
   }
  // Get the response as JSON
  return await response.json();
}

export { fetchGraphQL };