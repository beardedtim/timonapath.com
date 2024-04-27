import { query } from '@app/shared/connections/datastore'
import { z } from 'zod'

export const ThoughtSchema = z.object({
  _id: z.string().uuid(),
  title: z.string(),
  description: z.string().optional(),
  body: z.string(),
  published: z.boolean(),
  created_at: z.string().datetime(),
  published_at: z.string().datetime(),
  last_updated: z.string().datetime(),
})

export type Thought = z.infer<typeof ThoughtSchema>

export const CreateThoughtSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  body: z.string(),
  published: z.boolean(),
})

export type CreateThoughtDTO = z.infer<typeof CreateThoughtSchema>

export const mapDBToDTO = ({
  _id,
  title,
  description,
  created_at,
  last_updated,
  published,
  published_at,
  body,
}: {
  _id: string
  title: string
  description?: string
  created_at: string
  last_updated: string
  published: boolean
  published_at: string
  body: string
}): Thought => ({
  _id,
  title,
  description,
  created_at,
  last_updated,
  published,
  published_at,
  body,
})

export const createThought = (thought: CreateThoughtDTO) =>
  query(
    `
    INSERT INTO thoughts
        (title, description, body, published)
    VALUES
        ($1, $2, $3, $4)
    RETURNING
        *
`,
    [thought.title, thought.description, thought.body, thought.published],
  ).then(({ rows }) => rows[0] as Thought)

export const getById = (id: string) =>
  query(
    `
    SELECT
      *
    FROM
      thoughts
    WHERE
      _id = $1
    LIMIT 1
`,
    [id],
  )
    .then(({ rows }) => rows[0])
    .then(mapDBToDTO)

const makeUpdateQuery = (update: string[]): string =>
  update.reduce(
    (a, column, i) => `${a ? a + ', ' : ''}${column} = $${i + 1}`,
    '',
  )

export const updateThoughtById = (id: string, update: Partial<Thought>) => {
  const keys = Object.keys(update) as (keyof Partial<Thought>)[]
  const setQuery = makeUpdateQuery(keys)

  const sql = `
    UPDATE
      thoughts
    SET 
      ${setQuery}
    WHERE
      _id = $${keys.length + 1}
    RETURNING
      *
  `

  const args = keys.map((key) => update[key])

  return query(sql, [...args, id])
    .then(({ rows }) => rows[0])
    .then(mapDBToDTO)
}

export const getRecentThoughts = ({ limit }: { limit?: number }) =>
  query(`
  SELECT
    *
  FROM
    thoughts
  WHERE
    published IS TRUE
  ORDER BY published_at DESC
  LIMIT ${limit}
`).then(({ rows }) => rows.map(mapDBToDTO))
