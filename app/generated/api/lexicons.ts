/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { LexiconDoc, Lexicons } from '@atproto/lexicon'

export const schemaDict = {
  AppBskyVideoUploadVideo: {
    lexicon: 1,
    id: 'app.bsky.video.uploadVideo',
    defs: {
      main: {
        type: 'procedure',
        description: 'Upload a video to be processed then stored on the PDS.',
        input: {
          encoding: 'video/mp4',
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['jobStatus'],
            properties: {
              jobStatus: {
                type: 'ref',
                ref: 'lex:app.bsky.video.defs#jobStatus',
              },
            },
          },
        },
      },
    },
  },
  AppBskyVideoDefs: {
    lexicon: 1,
    id: 'app.bsky.video.defs',
    defs: {
      jobStatus: {
        type: 'object',
        required: ['jobId', 'did', 'state'],
        properties: {
          jobId: {
            type: 'string',
          },
          did: {
            type: 'string',
            format: 'did',
          },
          state: {
            type: 'string',
            description:
              'The state of the video processing job. All values not listed as a known value indicate that the job is in process.',
            knownValues: ['JOB_STATE_COMPLETED', 'JOB_STATE_FAILED'],
          },
          progress: {
            type: 'integer',
            minimum: 0,
            maximum: 100,
            description: 'Progress within the current processing state.',
          },
          blob: {
            type: 'blob',
          },
          error: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
        },
      },
    },
  },
  AppBskyVideoGetJobStatus: {
    lexicon: 1,
    id: 'app.bsky.video.getJobStatus',
    defs: {
      main: {
        type: 'query',
        description: 'Get status details for a video processing job.',
        parameters: {
          type: 'params',
          required: ['jobId'],
          properties: {
            jobId: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['jobStatus'],
            properties: {
              jobStatus: {
                type: 'ref',
                ref: 'lex:app.bsky.video.defs#jobStatus',
              },
            },
          },
        },
      },
    },
  },
  AppBskyVideoGetUploadLimits: {
    lexicon: 1,
    id: 'app.bsky.video.getUploadLimits',
    defs: {
      main: {
        type: 'query',
        description: 'Get video upload limits for the authenticated user.',
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['canUpload'],
            properties: {
              canUpload: {
                type: 'boolean',
              },
              remainingDailyVideos: {
                type: 'integer',
              },
              remainingDailyBytes: {
                type: 'integer',
              },
              message: {
                type: 'string',
              },
              error: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
  AppBskyEmbedDefs: {
    lexicon: 1,
    id: 'app.bsky.embed.defs',
    defs: {
      aspectRatio: {
        type: 'object',
        description:
          'width:height represents an aspect ratio. It may be approximate, and may not correspond to absolute dimensions in any given unit.',
        required: ['width', 'height'],
        properties: {
          width: {
            type: 'integer',
            minimum: 1,
          },
          height: {
            type: 'integer',
            minimum: 1,
          },
        },
      },
    },
  },
  AppBskyEmbedRecord: {
    lexicon: 1,
    id: 'app.bsky.embed.record',
    description:
      'A representation of a record embedded in a Bluesky record (eg, a post). For example, a quote-post, or sharing a feed generator record.',
    defs: {
      main: {
        type: 'object',
        required: ['record'],
        properties: {
          record: {
            type: 'ref',
            ref: 'lex:com.atproto.repo.strongRef',
          },
        },
      },
      view: {
        type: 'object',
        required: ['record'],
        properties: {
          record: {
            type: 'union',
            refs: [
              'lex:app.bsky.embed.record#viewRecord',
              'lex:app.bsky.embed.record#viewNotFound',
              'lex:app.bsky.embed.record#viewBlocked',
              'lex:app.bsky.embed.record#viewDetached',
              'lex:app.bsky.feed.defs#generatorView',
              'lex:app.bsky.graph.defs#listView',
              'lex:app.bsky.labeler.defs#labelerView',
              'lex:app.bsky.graph.defs#starterPackViewBasic',
            ],
          },
        },
      },
      viewRecord: {
        type: 'object',
        required: ['uri', 'cid', 'author', 'value', 'indexedAt'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
          author: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#profileViewBasic',
          },
          value: {
            type: 'unknown',
            description: 'The record data itself.',
          },
          labels: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:com.atproto.label.defs#label',
            },
          },
          replyCount: {
            type: 'integer',
          },
          repostCount: {
            type: 'integer',
          },
          likeCount: {
            type: 'integer',
          },
          quoteCount: {
            type: 'integer',
          },
          embeds: {
            type: 'array',
            items: {
              type: 'union',
              refs: [
                'lex:app.bsky.embed.images#view',
                'lex:app.bsky.embed.video#view',
                'lex:app.bsky.embed.external#view',
                'lex:app.bsky.embed.record#view',
                'lex:app.bsky.embed.recordWithMedia#view',
              ],
            },
          },
          indexedAt: {
            type: 'string',
            format: 'datetime',
          },
        },
      },
      viewNotFound: {
        type: 'object',
        required: ['uri', 'notFound'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          notFound: {
            type: 'boolean',
            const: true,
          },
        },
      },
      viewBlocked: {
        type: 'object',
        required: ['uri', 'blocked', 'author'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          blocked: {
            type: 'boolean',
            const: true,
          },
          author: {
            type: 'ref',
            ref: 'lex:app.bsky.feed.defs#blockedAuthor',
          },
        },
      },
      viewDetached: {
        type: 'object',
        required: ['uri', 'detached'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          detached: {
            type: 'boolean',
            const: true,
          },
        },
      },
    },
  },
  AppBskyEmbedImages: {
    lexicon: 1,
    id: 'app.bsky.embed.images',
    description: 'A set of images embedded in a Bluesky record (eg, a post).',
    defs: {
      main: {
        type: 'object',
        required: ['images'],
        properties: {
          images: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:app.bsky.embed.images#image',
            },
            maxLength: 4,
          },
        },
      },
      image: {
        type: 'object',
        required: ['image', 'alt'],
        properties: {
          image: {
            type: 'blob',
            accept: ['image/*'],
            maxSize: 1000000,
          },
          alt: {
            type: 'string',
            description:
              'Alt text description of the image, for accessibility.',
          },
          aspectRatio: {
            type: 'ref',
            ref: 'lex:app.bsky.embed.defs#aspectRatio',
          },
        },
      },
      view: {
        type: 'object',
        required: ['images'],
        properties: {
          images: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:app.bsky.embed.images#viewImage',
            },
            maxLength: 4,
          },
        },
      },
      viewImage: {
        type: 'object',
        required: ['thumb', 'fullsize', 'alt'],
        properties: {
          thumb: {
            type: 'string',
            format: 'uri',
            description:
              'Fully-qualified URL where a thumbnail of the image can be fetched. For example, CDN location provided by the App View.',
          },
          fullsize: {
            type: 'string',
            format: 'uri',
            description:
              'Fully-qualified URL where a large version of the image can be fetched. May or may not be the exact original blob. For example, CDN location provided by the App View.',
          },
          alt: {
            type: 'string',
            description:
              'Alt text description of the image, for accessibility.',
          },
          aspectRatio: {
            type: 'ref',
            ref: 'lex:app.bsky.embed.defs#aspectRatio',
          },
        },
      },
    },
  },
  AppBskyEmbedRecordWithMedia: {
    lexicon: 1,
    id: 'app.bsky.embed.recordWithMedia',
    description:
      'A representation of a record embedded in a Bluesky record (eg, a post), alongside other compatible embeds. For example, a quote post and image, or a quote post and external URL card.',
    defs: {
      main: {
        type: 'object',
        required: ['record', 'media'],
        properties: {
          record: {
            type: 'ref',
            ref: 'lex:app.bsky.embed.record',
          },
          media: {
            type: 'union',
            refs: [
              'lex:app.bsky.embed.images',
              'lex:app.bsky.embed.video',
              'lex:app.bsky.embed.external',
            ],
          },
        },
      },
      view: {
        type: 'object',
        required: ['record', 'media'],
        properties: {
          record: {
            type: 'ref',
            ref: 'lex:app.bsky.embed.record#view',
          },
          media: {
            type: 'union',
            refs: [
              'lex:app.bsky.embed.images#view',
              'lex:app.bsky.embed.video#view',
              'lex:app.bsky.embed.external#view',
            ],
          },
        },
      },
    },
  },
  AppBskyEmbedVideo: {
    lexicon: 1,
    id: 'app.bsky.embed.video',
    description: 'A video embedded in a Bluesky record (eg, a post).',
    defs: {
      main: {
        type: 'object',
        required: ['video'],
        properties: {
          video: {
            type: 'blob',
            accept: ['video/mp4'],
            maxSize: 50000000,
          },
          captions: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:app.bsky.embed.video#caption',
            },
            maxLength: 20,
          },
          alt: {
            type: 'string',
            description:
              'Alt text description of the video, for accessibility.',
            maxGraphemes: 1000,
            maxLength: 10000,
          },
          aspectRatio: {
            type: 'ref',
            ref: 'lex:app.bsky.embed.defs#aspectRatio',
          },
        },
      },
      caption: {
        type: 'object',
        required: ['lang', 'file'],
        properties: {
          lang: {
            type: 'string',
            format: 'language',
          },
          file: {
            type: 'blob',
            accept: ['text/vtt'],
            maxSize: 20000,
          },
        },
      },
      view: {
        type: 'object',
        required: ['cid', 'playlist'],
        properties: {
          cid: {
            type: 'string',
            format: 'cid',
          },
          playlist: {
            type: 'string',
            format: 'uri',
          },
          thumbnail: {
            type: 'string',
            format: 'uri',
          },
          alt: {
            type: 'string',
            maxGraphemes: 1000,
            maxLength: 10000,
          },
          aspectRatio: {
            type: 'ref',
            ref: 'lex:app.bsky.embed.defs#aspectRatio',
          },
        },
      },
    },
  },
  AppBskyEmbedExternal: {
    lexicon: 1,
    id: 'app.bsky.embed.external',
    defs: {
      main: {
        type: 'object',
        description:
          "A representation of some externally linked content (eg, a URL and 'card'), embedded in a Bluesky record (eg, a post).",
        required: ['external'],
        properties: {
          external: {
            type: 'ref',
            ref: 'lex:app.bsky.embed.external#external',
          },
        },
      },
      external: {
        type: 'object',
        required: ['uri', 'title', 'description'],
        properties: {
          uri: {
            type: 'string',
            format: 'uri',
          },
          title: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          thumb: {
            type: 'blob',
            accept: ['image/*'],
            maxSize: 1000000,
          },
        },
      },
      view: {
        type: 'object',
        required: ['external'],
        properties: {
          external: {
            type: 'ref',
            ref: 'lex:app.bsky.embed.external#viewExternal',
          },
        },
      },
      viewExternal: {
        type: 'object',
        required: ['uri', 'title', 'description'],
        properties: {
          uri: {
            type: 'string',
            format: 'uri',
          },
          title: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          thumb: {
            type: 'string',
            format: 'uri',
          },
        },
      },
    },
  },
  AppBskyNotificationRegisterPush: {
    lexicon: 1,
    id: 'app.bsky.notification.registerPush',
    defs: {
      main: {
        type: 'procedure',
        description:
          'Register to receive push notifications, via a specified service, for the requesting account. Requires auth.',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['serviceDid', 'token', 'platform', 'appId'],
            properties: {
              serviceDid: {
                type: 'string',
                format: 'did',
              },
              token: {
                type: 'string',
              },
              platform: {
                type: 'string',
                knownValues: ['ios', 'android', 'web'],
              },
              appId: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
  AppBskyNotificationPutPreferences: {
    lexicon: 1,
    id: 'app.bsky.notification.putPreferences',
    defs: {
      main: {
        type: 'procedure',
        description:
          'Set notification-related preferences for an account. Requires auth.',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['priority'],
            properties: {
              priority: {
                type: 'boolean',
              },
            },
          },
        },
      },
    },
  },
  AppBskyNotificationUpdateSeen: {
    lexicon: 1,
    id: 'app.bsky.notification.updateSeen',
    defs: {
      main: {
        type: 'procedure',
        description:
          'Notify server that the requesting account has seen notifications. Requires auth.',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['seenAt'],
            properties: {
              seenAt: {
                type: 'string',
                format: 'datetime',
              },
            },
          },
        },
      },
    },
  },
  AppBskyNotificationListNotifications: {
    lexicon: 1,
    id: 'app.bsky.notification.listNotifications',
    defs: {
      main: {
        type: 'query',
        description:
          'Enumerate notifications for the requesting account. Requires auth.',
        parameters: {
          type: 'params',
          properties: {
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            priority: {
              type: 'boolean',
            },
            cursor: {
              type: 'string',
            },
            seenAt: {
              type: 'string',
              format: 'datetime',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['notifications'],
            properties: {
              cursor: {
                type: 'string',
              },
              notifications: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.notification.listNotifications#notification',
                },
              },
              priority: {
                type: 'boolean',
              },
              seenAt: {
                type: 'string',
                format: 'datetime',
              },
            },
          },
        },
      },
      notification: {
        type: 'object',
        required: [
          'uri',
          'cid',
          'author',
          'reason',
          'record',
          'isRead',
          'indexedAt',
        ],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
          author: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#profileView',
          },
          reason: {
            type: 'string',
            description:
              "Expected values are 'like', 'repost', 'follow', 'mention', 'reply', 'quote', and 'starterpack-joined'.",
            knownValues: [
              'like',
              'repost',
              'follow',
              'mention',
              'reply',
              'quote',
              'starterpack-joined',
            ],
          },
          reasonSubject: {
            type: 'string',
            format: 'at-uri',
          },
          record: {
            type: 'unknown',
          },
          isRead: {
            type: 'boolean',
          },
          indexedAt: {
            type: 'string',
            format: 'datetime',
          },
          labels: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:com.atproto.label.defs#label',
            },
          },
        },
      },
    },
  },
  AppBskyNotificationGetUnreadCount: {
    lexicon: 1,
    id: 'app.bsky.notification.getUnreadCount',
    defs: {
      main: {
        type: 'query',
        description:
          'Count the number of unread notifications for the requesting account. Requires auth.',
        parameters: {
          type: 'params',
          properties: {
            priority: {
              type: 'boolean',
            },
            seenAt: {
              type: 'string',
              format: 'datetime',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['count'],
            properties: {
              count: {
                type: 'integer',
              },
            },
          },
        },
      },
    },
  },
  AppBskyUnspeccedSearchStarterPacksSkeleton: {
    lexicon: 1,
    id: 'app.bsky.unspecced.searchStarterPacksSkeleton',
    defs: {
      main: {
        type: 'query',
        description: 'Backend Starter Pack search, returns only skeleton.',
        parameters: {
          type: 'params',
          required: ['q'],
          properties: {
            q: {
              type: 'string',
              description:
                'Search query string; syntax, phrase, boolean, and faceting is unspecified, but Lucene query syntax is recommended.',
            },
            viewer: {
              type: 'string',
              format: 'did',
              description:
                'DID of the account making the request (not included for public/unauthenticated queries).',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 25,
            },
            cursor: {
              type: 'string',
              description:
                'Optional pagination mechanism; may not necessarily allow scrolling through entire result set.',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['starterPacks'],
            properties: {
              cursor: {
                type: 'string',
              },
              hitsTotal: {
                type: 'integer',
                description:
                  'Count of search hits. Optional, may be rounded/truncated, and may not be possible to paginate through all hits.',
              },
              starterPacks: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.unspecced.defs#skeletonSearchStarterPack',
                },
              },
            },
          },
        },
        errors: [
          {
            name: 'BadQueryString',
          },
        ],
      },
    },
  },
  AppBskyUnspeccedDefs: {
    lexicon: 1,
    id: 'app.bsky.unspecced.defs',
    defs: {
      skeletonSearchPost: {
        type: 'object',
        required: ['uri'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
        },
      },
      skeletonSearchActor: {
        type: 'object',
        required: ['did'],
        properties: {
          did: {
            type: 'string',
            format: 'did',
          },
        },
      },
      skeletonSearchStarterPack: {
        type: 'object',
        required: ['uri'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
        },
      },
    },
  },
  AppBskyUnspeccedSearchActorsSkeleton: {
    lexicon: 1,
    id: 'app.bsky.unspecced.searchActorsSkeleton',
    defs: {
      main: {
        type: 'query',
        description: 'Backend Actors (profile) search, returns only skeleton.',
        parameters: {
          type: 'params',
          required: ['q'],
          properties: {
            q: {
              type: 'string',
              description:
                'Search query string; syntax, phrase, boolean, and faceting is unspecified, but Lucene query syntax is recommended. For typeahead search, only simple term match is supported, not full syntax.',
            },
            viewer: {
              type: 'string',
              format: 'did',
              description:
                'DID of the account making the request (not included for public/unauthenticated queries). Used to boost followed accounts in ranking.',
            },
            typeahead: {
              type: 'boolean',
              description: "If true, acts as fast/simple 'typeahead' query.",
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 25,
            },
            cursor: {
              type: 'string',
              description:
                'Optional pagination mechanism; may not necessarily allow scrolling through entire result set.',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['actors'],
            properties: {
              cursor: {
                type: 'string',
              },
              hitsTotal: {
                type: 'integer',
                description:
                  'Count of search hits. Optional, may be rounded/truncated, and may not be possible to paginate through all hits.',
              },
              actors: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.unspecced.defs#skeletonSearchActor',
                },
              },
            },
          },
        },
        errors: [
          {
            name: 'BadQueryString',
          },
        ],
      },
    },
  },
  AppBskyUnspeccedGetSuggestionsSkeleton: {
    lexicon: 1,
    id: 'app.bsky.unspecced.getSuggestionsSkeleton',
    defs: {
      main: {
        type: 'query',
        description:
          'Get a skeleton of suggested actors. Intended to be called and then hydrated through app.bsky.actor.getSuggestions',
        parameters: {
          type: 'params',
          properties: {
            viewer: {
              type: 'string',
              format: 'did',
              description:
                'DID of the account making the request (not included for public/unauthenticated queries). Used to boost followed accounts in ranking.',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
            relativeToDid: {
              type: 'string',
              format: 'did',
              description:
                'DID of the account to get suggestions relative to. If not provided, suggestions will be based on the viewer.',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['actors'],
            properties: {
              cursor: {
                type: 'string',
              },
              actors: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.unspecced.defs#skeletonSearchActor',
                },
              },
              relativeToDid: {
                type: 'string',
                format: 'did',
                description:
                  'DID of the account these suggestions are relative to. If this is returned undefined, suggestions are based on the viewer.',
              },
            },
          },
        },
      },
    },
  },
  AppBskyUnspeccedSearchPostsSkeleton: {
    lexicon: 1,
    id: 'app.bsky.unspecced.searchPostsSkeleton',
    defs: {
      main: {
        type: 'query',
        description: 'Backend Posts search, returns only skeleton',
        parameters: {
          type: 'params',
          required: ['q'],
          properties: {
            q: {
              type: 'string',
              description:
                'Search query string; syntax, phrase, boolean, and faceting is unspecified, but Lucene query syntax is recommended.',
            },
            sort: {
              type: 'string',
              knownValues: ['top', 'latest'],
              default: 'latest',
              description: 'Specifies the ranking order of results.',
            },
            since: {
              type: 'string',
              description:
                "Filter results for posts after the indicated datetime (inclusive). Expected to use 'sortAt' timestamp, which may not match 'createdAt'. Can be a datetime, or just an ISO date (YYYY-MM-DD).",
            },
            until: {
              type: 'string',
              description:
                "Filter results for posts before the indicated datetime (not inclusive). Expected to use 'sortAt' timestamp, which may not match 'createdAt'. Can be a datetime, or just an ISO date (YYY-MM-DD).",
            },
            mentions: {
              type: 'string',
              format: 'at-identifier',
              description:
                'Filter to posts which mention the given account. Handles are resolved to DID before query-time. Only matches rich-text facet mentions.',
            },
            author: {
              type: 'string',
              format: 'at-identifier',
              description:
                'Filter to posts by the given account. Handles are resolved to DID before query-time.',
            },
            lang: {
              type: 'string',
              format: 'language',
              description:
                'Filter to posts in the given language. Expected to be based on post language field, though server may override language detection.',
            },
            domain: {
              type: 'string',
              description:
                'Filter to posts with URLs (facet links or embeds) linking to the given domain (hostname). Server may apply hostname normalization.',
            },
            url: {
              type: 'string',
              format: 'uri',
              description:
                'Filter to posts with links (facet links or embeds) pointing to this URL. Server may apply URL normalization or fuzzy matching.',
            },
            tag: {
              type: 'array',
              items: {
                type: 'string',
                maxLength: 640,
                maxGraphemes: 64,
              },
              description:
                "Filter to posts with the given tag (hashtag), based on rich-text facet or tag field. Do not include the hash (#) prefix. Multiple tags can be specified, with 'AND' matching.",
            },
            viewer: {
              type: 'string',
              format: 'did',
              description:
                "DID of the account making the request (not included for public/unauthenticated queries). Used for 'from:me' queries.",
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 25,
            },
            cursor: {
              type: 'string',
              description:
                'Optional pagination mechanism; may not necessarily allow scrolling through entire result set.',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['posts'],
            properties: {
              cursor: {
                type: 'string',
              },
              hitsTotal: {
                type: 'integer',
                description:
                  'Count of search hits. Optional, may be rounded/truncated, and may not be possible to paginate through all hits.',
              },
              posts: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.unspecced.defs#skeletonSearchPost',
                },
              },
            },
          },
        },
        errors: [
          {
            name: 'BadQueryString',
          },
        ],
      },
    },
  },
  AppBskyUnspeccedGetPopularFeedGenerators: {
    lexicon: 1,
    id: 'app.bsky.unspecced.getPopularFeedGenerators',
    defs: {
      main: {
        type: 'query',
        description: 'An unspecced view of globally popular feed generators.',
        parameters: {
          type: 'params',
          properties: {
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
            query: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['feeds'],
            properties: {
              cursor: {
                type: 'string',
              },
              feeds: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.feed.defs#generatorView',
                },
              },
            },
          },
        },
      },
    },
  },
  AppBskyUnspeccedGetTaggedSuggestions: {
    lexicon: 1,
    id: 'app.bsky.unspecced.getTaggedSuggestions',
    defs: {
      main: {
        type: 'query',
        description:
          'Get a list of suggestions (feeds and users) tagged with categories',
        parameters: {
          type: 'params',
          properties: {},
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['suggestions'],
            properties: {
              suggestions: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.unspecced.getTaggedSuggestions#suggestion',
                },
              },
            },
          },
        },
      },
      suggestion: {
        type: 'object',
        required: ['tag', 'subjectType', 'subject'],
        properties: {
          tag: {
            type: 'string',
          },
          subjectType: {
            type: 'string',
            knownValues: ['actor', 'feed'],
          },
          subject: {
            type: 'string',
            format: 'uri',
          },
        },
      },
    },
  },
  AppBskyUnspeccedGetConfig: {
    lexicon: 1,
    id: 'app.bsky.unspecced.getConfig',
    defs: {
      main: {
        type: 'query',
        description: 'Get miscellaneous runtime configuration.',
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: [],
            properties: {
              checkEmailConfirmed: {
                type: 'boolean',
              },
            },
          },
        },
      },
    },
  },
  AppBskyGraphGetStarterPacks: {
    lexicon: 1,
    id: 'app.bsky.graph.getStarterPacks',
    defs: {
      main: {
        type: 'query',
        description: 'Get views for a list of starter packs.',
        parameters: {
          type: 'params',
          required: ['uris'],
          properties: {
            uris: {
              type: 'array',
              items: {
                type: 'string',
                format: 'at-uri',
              },
              maxLength: 25,
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['starterPacks'],
            properties: {
              starterPacks: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.graph.defs#starterPackViewBasic',
                },
              },
            },
          },
        },
      },
    },
  },
  AppBskyGraphGetSuggestedFollowsByActor: {
    lexicon: 1,
    id: 'app.bsky.graph.getSuggestedFollowsByActor',
    defs: {
      main: {
        type: 'query',
        description:
          'Enumerates follows similar to a given account (actor). Expected use is to recommend additional accounts immediately after following one account.',
        parameters: {
          type: 'params',
          required: ['actor'],
          properties: {
            actor: {
              type: 'string',
              format: 'at-identifier',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['suggestions'],
            properties: {
              suggestions: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.actor.defs#profileView',
                },
              },
              isFallback: {
                type: 'boolean',
                description:
                  'If true, response has fallen-back to generic results, and is not scoped using relativeToDid',
                default: false,
              },
            },
          },
        },
      },
    },
  },
  AppBskyGraphBlock: {
    lexicon: 1,
    id: 'app.bsky.graph.block',
    defs: {
      main: {
        type: 'record',
        description:
          "Record declaring a 'block' relationship against another account. NOTE: blocks are public in Bluesky; see blog posts for details.",
        key: 'tid',
        record: {
          type: 'object',
          required: ['subject', 'createdAt'],
          properties: {
            subject: {
              type: 'string',
              format: 'did',
              description: 'DID of the account to be blocked.',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
          },
        },
      },
    },
  },
  AppBskyGraphFollow: {
    lexicon: 1,
    id: 'app.bsky.graph.follow',
    defs: {
      main: {
        type: 'record',
        description:
          "Record declaring a social 'follow' relationship of another account. Duplicate follows will be ignored by the AppView.",
        key: 'tid',
        record: {
          type: 'object',
          required: ['subject', 'createdAt'],
          properties: {
            subject: {
              type: 'string',
              format: 'did',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
          },
        },
      },
    },
  },
  AppBskyGraphDefs: {
    lexicon: 1,
    id: 'app.bsky.graph.defs',
    defs: {
      listViewBasic: {
        type: 'object',
        required: ['uri', 'cid', 'name', 'purpose'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
          name: {
            type: 'string',
            maxLength: 64,
            minLength: 1,
          },
          purpose: {
            type: 'ref',
            ref: 'lex:app.bsky.graph.defs#listPurpose',
          },
          avatar: {
            type: 'string',
            format: 'uri',
          },
          listItemCount: {
            type: 'integer',
            minimum: 0,
          },
          labels: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:com.atproto.label.defs#label',
            },
          },
          viewer: {
            type: 'ref',
            ref: 'lex:app.bsky.graph.defs#listViewerState',
          },
          indexedAt: {
            type: 'string',
            format: 'datetime',
          },
        },
      },
      listView: {
        type: 'object',
        required: ['uri', 'cid', 'creator', 'name', 'purpose', 'indexedAt'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
          creator: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#profileView',
          },
          name: {
            type: 'string',
            maxLength: 64,
            minLength: 1,
          },
          purpose: {
            type: 'ref',
            ref: 'lex:app.bsky.graph.defs#listPurpose',
          },
          description: {
            type: 'string',
            maxGraphemes: 300,
            maxLength: 3000,
          },
          descriptionFacets: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:app.bsky.richtext.facet',
            },
          },
          avatar: {
            type: 'string',
            format: 'uri',
          },
          listItemCount: {
            type: 'integer',
            minimum: 0,
          },
          labels: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:com.atproto.label.defs#label',
            },
          },
          viewer: {
            type: 'ref',
            ref: 'lex:app.bsky.graph.defs#listViewerState',
          },
          indexedAt: {
            type: 'string',
            format: 'datetime',
          },
        },
      },
      listItemView: {
        type: 'object',
        required: ['uri', 'subject'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          subject: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#profileView',
          },
        },
      },
      starterPackView: {
        type: 'object',
        required: ['uri', 'cid', 'record', 'creator', 'indexedAt'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
          record: {
            type: 'unknown',
          },
          creator: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#profileViewBasic',
          },
          list: {
            type: 'ref',
            ref: 'lex:app.bsky.graph.defs#listViewBasic',
          },
          listItemsSample: {
            type: 'array',
            maxLength: 12,
            items: {
              type: 'ref',
              ref: 'lex:app.bsky.graph.defs#listItemView',
            },
          },
          feeds: {
            type: 'array',
            maxLength: 3,
            items: {
              type: 'ref',
              ref: 'lex:app.bsky.feed.defs#generatorView',
            },
          },
          joinedWeekCount: {
            type: 'integer',
            minimum: 0,
          },
          joinedAllTimeCount: {
            type: 'integer',
            minimum: 0,
          },
          labels: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:com.atproto.label.defs#label',
            },
          },
          indexedAt: {
            type: 'string',
            format: 'datetime',
          },
        },
      },
      starterPackViewBasic: {
        type: 'object',
        required: ['uri', 'cid', 'record', 'creator', 'indexedAt'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
          record: {
            type: 'unknown',
          },
          creator: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#profileViewBasic',
          },
          listItemCount: {
            type: 'integer',
            minimum: 0,
          },
          joinedWeekCount: {
            type: 'integer',
            minimum: 0,
          },
          joinedAllTimeCount: {
            type: 'integer',
            minimum: 0,
          },
          labels: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:com.atproto.label.defs#label',
            },
          },
          indexedAt: {
            type: 'string',
            format: 'datetime',
          },
        },
      },
      listPurpose: {
        type: 'string',
        knownValues: [
          'app.bsky.graph.defs#modlist',
          'app.bsky.graph.defs#curatelist',
          'app.bsky.graph.defs#referencelist',
        ],
      },
      modlist: {
        type: 'token',
        description:
          'A list of actors to apply an aggregate moderation action (mute/block) on.',
      },
      curatelist: {
        type: 'token',
        description:
          'A list of actors used for curation purposes such as list feeds or interaction gating.',
      },
      referencelist: {
        type: 'token',
        description:
          'A list of actors used for only for reference purposes such as within a starter pack.',
      },
      listViewerState: {
        type: 'object',
        properties: {
          muted: {
            type: 'boolean',
          },
          blocked: {
            type: 'string',
            format: 'at-uri',
          },
        },
      },
      notFoundActor: {
        type: 'object',
        description: 'indicates that a handle or DID could not be resolved',
        required: ['actor', 'notFound'],
        properties: {
          actor: {
            type: 'string',
            format: 'at-identifier',
          },
          notFound: {
            type: 'boolean',
            const: true,
          },
        },
      },
      relationship: {
        type: 'object',
        description:
          'lists the bi-directional graph relationships between one actor (not indicated in the object), and the target actors (the DID included in the object)',
        required: ['did'],
        properties: {
          did: {
            type: 'string',
            format: 'did',
          },
          following: {
            type: 'string',
            format: 'at-uri',
            description:
              'if the actor follows this DID, this is the AT-URI of the follow record',
          },
          followedBy: {
            type: 'string',
            format: 'at-uri',
            description:
              'if the actor is followed by this DID, contains the AT-URI of the follow record',
          },
        },
      },
    },
  },
  AppBskyGraphUnmuteActorList: {
    lexicon: 1,
    id: 'app.bsky.graph.unmuteActorList',
    defs: {
      main: {
        type: 'procedure',
        description: 'Unmutes the specified list of accounts. Requires auth.',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['list'],
            properties: {
              list: {
                type: 'string',
                format: 'at-uri',
              },
            },
          },
        },
      },
    },
  },
  AppBskyGraphGetListBlocks: {
    lexicon: 1,
    id: 'app.bsky.graph.getListBlocks',
    defs: {
      main: {
        type: 'query',
        description:
          'Get mod lists that the requesting account (actor) is blocking. Requires auth.',
        parameters: {
          type: 'params',
          properties: {
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['lists'],
            properties: {
              cursor: {
                type: 'string',
              },
              lists: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.graph.defs#listView',
                },
              },
            },
          },
        },
      },
    },
  },
  AppBskyGraphListblock: {
    lexicon: 1,
    id: 'app.bsky.graph.listblock',
    defs: {
      main: {
        type: 'record',
        description:
          'Record representing a block relationship against an entire an entire list of accounts (actors).',
        key: 'tid',
        record: {
          type: 'object',
          required: ['subject', 'createdAt'],
          properties: {
            subject: {
              type: 'string',
              format: 'at-uri',
              description: 'Reference (AT-URI) to the mod list record.',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
          },
        },
      },
    },
  },
  AppBskyGraphGetStarterPack: {
    lexicon: 1,
    id: 'app.bsky.graph.getStarterPack',
    defs: {
      main: {
        type: 'query',
        description: 'Gets a view of a starter pack.',
        parameters: {
          type: 'params',
          required: ['starterPack'],
          properties: {
            starterPack: {
              type: 'string',
              format: 'at-uri',
              description: 'Reference (AT-URI) of the starter pack record.',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['starterPack'],
            properties: {
              starterPack: {
                type: 'ref',
                ref: 'lex:app.bsky.graph.defs#starterPackView',
              },
            },
          },
        },
      },
    },
  },
  AppBskyGraphStarterpack: {
    lexicon: 1,
    id: 'app.bsky.graph.starterpack',
    defs: {
      main: {
        type: 'record',
        description:
          'Record defining a starter pack of actors and feeds for new users.',
        key: 'tid',
        record: {
          type: 'object',
          required: ['name', 'list', 'createdAt'],
          properties: {
            name: {
              type: 'string',
              maxGraphemes: 50,
              maxLength: 500,
              minLength: 1,
              description: 'Display name for starter pack; can not be empty.',
            },
            description: {
              type: 'string',
              maxGraphemes: 300,
              maxLength: 3000,
            },
            descriptionFacets: {
              type: 'array',
              items: {
                type: 'ref',
                ref: 'lex:app.bsky.richtext.facet',
              },
            },
            list: {
              type: 'string',
              format: 'at-uri',
              description: 'Reference (AT-URI) to the list record.',
            },
            feeds: {
              type: 'array',
              maxLength: 3,
              items: {
                type: 'ref',
                ref: 'lex:app.bsky.graph.starterpack#feedItem',
              },
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
          },
        },
      },
      feedItem: {
        type: 'object',
        required: ['uri'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
        },
      },
    },
  },
  AppBskyGraphMuteActorList: {
    lexicon: 1,
    id: 'app.bsky.graph.muteActorList',
    defs: {
      main: {
        type: 'procedure',
        description:
          'Creates a mute relationship for the specified list of accounts. Mutes are private in Bluesky. Requires auth.',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['list'],
            properties: {
              list: {
                type: 'string',
                format: 'at-uri',
              },
            },
          },
        },
      },
    },
  },
  AppBskyGraphMuteThread: {
    lexicon: 1,
    id: 'app.bsky.graph.muteThread',
    defs: {
      main: {
        type: 'procedure',
        description:
          'Mutes a thread preventing notifications from the thread and any of its children. Mutes are private in Bluesky. Requires auth.',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['root'],
            properties: {
              root: {
                type: 'string',
                format: 'at-uri',
              },
            },
          },
        },
      },
    },
  },
  AppBskyGraphSearchStarterPacks: {
    lexicon: 1,
    id: 'app.bsky.graph.searchStarterPacks',
    defs: {
      main: {
        type: 'query',
        description:
          'Find starter packs matching search criteria. Does not require auth.',
        parameters: {
          type: 'params',
          required: ['q'],
          properties: {
            q: {
              type: 'string',
              description:
                'Search query string. Syntax, phrase, boolean, and faceting is unspecified, but Lucene query syntax is recommended.',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 25,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['starterPacks'],
            properties: {
              cursor: {
                type: 'string',
              },
              starterPacks: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.graph.defs#starterPackViewBasic',
                },
              },
            },
          },
        },
      },
    },
  },
  AppBskyGraphGetActorStarterPacks: {
    lexicon: 1,
    id: 'app.bsky.graph.getActorStarterPacks',
    defs: {
      main: {
        type: 'query',
        description: 'Get a list of starter packs created by the actor.',
        parameters: {
          type: 'params',
          required: ['actor'],
          properties: {
            actor: {
              type: 'string',
              format: 'at-identifier',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['starterPacks'],
            properties: {
              cursor: {
                type: 'string',
              },
              starterPacks: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.graph.defs#starterPackViewBasic',
                },
              },
            },
          },
        },
      },
    },
  },
  AppBskyGraphGetLists: {
    lexicon: 1,
    id: 'app.bsky.graph.getLists',
    defs: {
      main: {
        type: 'query',
        description:
          'Enumerates the lists created by a specified account (actor).',
        parameters: {
          type: 'params',
          required: ['actor'],
          properties: {
            actor: {
              type: 'string',
              format: 'at-identifier',
              description: 'The account (actor) to enumerate lists from.',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['lists'],
            properties: {
              cursor: {
                type: 'string',
              },
              lists: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.graph.defs#listView',
                },
              },
            },
          },
        },
      },
    },
  },
  AppBskyGraphGetFollowers: {
    lexicon: 1,
    id: 'app.bsky.graph.getFollowers',
    defs: {
      main: {
        type: 'query',
        description:
          'Enumerates accounts which follow a specified account (actor).',
        parameters: {
          type: 'params',
          required: ['actor'],
          properties: {
            actor: {
              type: 'string',
              format: 'at-identifier',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['subject', 'followers'],
            properties: {
              subject: {
                type: 'ref',
                ref: 'lex:app.bsky.actor.defs#profileView',
              },
              cursor: {
                type: 'string',
              },
              followers: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.actor.defs#profileView',
                },
              },
            },
          },
        },
      },
    },
  },
  AppBskyGraphUnmuteThread: {
    lexicon: 1,
    id: 'app.bsky.graph.unmuteThread',
    defs: {
      main: {
        type: 'procedure',
        description: 'Unmutes the specified thread. Requires auth.',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['root'],
            properties: {
              root: {
                type: 'string',
                format: 'at-uri',
              },
            },
          },
        },
      },
    },
  },
  AppBskyGraphMuteActor: {
    lexicon: 1,
    id: 'app.bsky.graph.muteActor',
    defs: {
      main: {
        type: 'procedure',
        description:
          'Creates a mute relationship for the specified account. Mutes are private in Bluesky. Requires auth.',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['actor'],
            properties: {
              actor: {
                type: 'string',
                format: 'at-identifier',
              },
            },
          },
        },
      },
    },
  },
  AppBskyGraphGetMutes: {
    lexicon: 1,
    id: 'app.bsky.graph.getMutes',
    defs: {
      main: {
        type: 'query',
        description:
          'Enumerates accounts that the requesting account (actor) currently has muted. Requires auth.',
        parameters: {
          type: 'params',
          properties: {
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['mutes'],
            properties: {
              cursor: {
                type: 'string',
              },
              mutes: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.actor.defs#profileView',
                },
              },
            },
          },
        },
      },
    },
  },
  AppBskyGraphListitem: {
    lexicon: 1,
    id: 'app.bsky.graph.listitem',
    defs: {
      main: {
        type: 'record',
        description:
          "Record representing an account's inclusion on a specific list. The AppView will ignore duplicate listitem records.",
        key: 'tid',
        record: {
          type: 'object',
          required: ['subject', 'list', 'createdAt'],
          properties: {
            subject: {
              type: 'string',
              format: 'did',
              description: 'The account which is included on the list.',
            },
            list: {
              type: 'string',
              format: 'at-uri',
              description:
                'Reference (AT-URI) to the list record (app.bsky.graph.list).',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
          },
        },
      },
    },
  },
  AppBskyGraphList: {
    lexicon: 1,
    id: 'app.bsky.graph.list',
    defs: {
      main: {
        type: 'record',
        description:
          'Record representing a list of accounts (actors). Scope includes both moderation-oriented lists and curration-oriented lists.',
        key: 'tid',
        record: {
          type: 'object',
          required: ['name', 'purpose', 'createdAt'],
          properties: {
            purpose: {
              type: 'ref',
              description:
                'Defines the purpose of the list (aka, moderation-oriented or curration-oriented)',
              ref: 'lex:app.bsky.graph.defs#listPurpose',
            },
            name: {
              type: 'string',
              maxLength: 64,
              minLength: 1,
              description: 'Display name for list; can not be empty.',
            },
            description: {
              type: 'string',
              maxGraphemes: 300,
              maxLength: 3000,
            },
            descriptionFacets: {
              type: 'array',
              items: {
                type: 'ref',
                ref: 'lex:app.bsky.richtext.facet',
              },
            },
            avatar: {
              type: 'blob',
              accept: ['image/png', 'image/jpeg'],
              maxSize: 1000000,
            },
            labels: {
              type: 'union',
              refs: ['lex:com.atproto.label.defs#selfLabels'],
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
          },
        },
      },
    },
  },
  AppBskyGraphGetKnownFollowers: {
    lexicon: 1,
    id: 'app.bsky.graph.getKnownFollowers',
    defs: {
      main: {
        type: 'query',
        description:
          'Enumerates accounts which follow a specified account (actor) and are followed by the viewer.',
        parameters: {
          type: 'params',
          required: ['actor'],
          properties: {
            actor: {
              type: 'string',
              format: 'at-identifier',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['subject', 'followers'],
            properties: {
              subject: {
                type: 'ref',
                ref: 'lex:app.bsky.actor.defs#profileView',
              },
              cursor: {
                type: 'string',
              },
              followers: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.actor.defs#profileView',
                },
              },
            },
          },
        },
      },
    },
  },
  AppBskyGraphGetListMutes: {
    lexicon: 1,
    id: 'app.bsky.graph.getListMutes',
    defs: {
      main: {
        type: 'query',
        description:
          'Enumerates mod lists that the requesting account (actor) currently has muted. Requires auth.',
        parameters: {
          type: 'params',
          properties: {
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['lists'],
            properties: {
              cursor: {
                type: 'string',
              },
              lists: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.graph.defs#listView',
                },
              },
            },
          },
        },
      },
    },
  },
  AppBskyGraphGetFollows: {
    lexicon: 1,
    id: 'app.bsky.graph.getFollows',
    defs: {
      main: {
        type: 'query',
        description:
          'Enumerates accounts which a specified account (actor) follows.',
        parameters: {
          type: 'params',
          required: ['actor'],
          properties: {
            actor: {
              type: 'string',
              format: 'at-identifier',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['subject', 'follows'],
            properties: {
              subject: {
                type: 'ref',
                ref: 'lex:app.bsky.actor.defs#profileView',
              },
              cursor: {
                type: 'string',
              },
              follows: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.actor.defs#profileView',
                },
              },
            },
          },
        },
      },
    },
  },
  AppBskyGraphGetBlocks: {
    lexicon: 1,
    id: 'app.bsky.graph.getBlocks',
    defs: {
      main: {
        type: 'query',
        description:
          'Enumerates which accounts the requesting account is currently blocking. Requires auth.',
        parameters: {
          type: 'params',
          properties: {
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['blocks'],
            properties: {
              cursor: {
                type: 'string',
              },
              blocks: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.actor.defs#profileView',
                },
              },
            },
          },
        },
      },
    },
  },
  AppBskyGraphGetRelationships: {
    lexicon: 1,
    id: 'app.bsky.graph.getRelationships',
    defs: {
      main: {
        type: 'query',
        description:
          'Enumerates public relationships between one account, and a list of other accounts. Does not require auth.',
        parameters: {
          type: 'params',
          required: ['actor'],
          properties: {
            actor: {
              type: 'string',
              format: 'at-identifier',
              description: 'Primary account requesting relationships for.',
            },
            others: {
              type: 'array',
              description:
                "List of 'other' accounts to be related back to the primary.",
              maxLength: 30,
              items: {
                type: 'string',
                format: 'at-identifier',
              },
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['relationships'],
            properties: {
              actor: {
                type: 'string',
                format: 'did',
              },
              relationships: {
                type: 'array',
                items: {
                  type: 'union',
                  refs: [
                    'lex:app.bsky.graph.defs#relationship',
                    'lex:app.bsky.graph.defs#notFoundActor',
                  ],
                },
              },
            },
          },
        },
        errors: [
          {
            name: 'ActorNotFound',
            description:
              'the primary actor at-identifier could not be resolved',
          },
        ],
      },
    },
  },
  AppBskyGraphUnmuteActor: {
    lexicon: 1,
    id: 'app.bsky.graph.unmuteActor',
    defs: {
      main: {
        type: 'procedure',
        description: 'Unmutes the specified account. Requires auth.',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['actor'],
            properties: {
              actor: {
                type: 'string',
                format: 'at-identifier',
              },
            },
          },
        },
      },
    },
  },
  AppBskyGraphGetList: {
    lexicon: 1,
    id: 'app.bsky.graph.getList',
    defs: {
      main: {
        type: 'query',
        description:
          "Gets a 'view' (with additional context) of a specified list.",
        parameters: {
          type: 'params',
          required: ['list'],
          properties: {
            list: {
              type: 'string',
              format: 'at-uri',
              description: 'Reference (AT-URI) of the list record to hydrate.',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['list', 'items'],
            properties: {
              cursor: {
                type: 'string',
              },
              list: {
                type: 'ref',
                ref: 'lex:app.bsky.graph.defs#listView',
              },
              items: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.graph.defs#listItemView',
                },
              },
            },
          },
        },
      },
    },
  },
  AppBskyFeedGenerator: {
    lexicon: 1,
    id: 'app.bsky.feed.generator',
    defs: {
      main: {
        type: 'record',
        description:
          'Record declaring of the existence of a feed generator, and containing metadata about it. The record can exist in any repository.',
        key: 'any',
        record: {
          type: 'object',
          required: ['did', 'displayName', 'createdAt'],
          properties: {
            did: {
              type: 'string',
              format: 'did',
            },
            displayName: {
              type: 'string',
              maxGraphemes: 24,
              maxLength: 240,
            },
            description: {
              type: 'string',
              maxGraphemes: 300,
              maxLength: 3000,
            },
            descriptionFacets: {
              type: 'array',
              items: {
                type: 'ref',
                ref: 'lex:app.bsky.richtext.facet',
              },
            },
            avatar: {
              type: 'blob',
              accept: ['image/png', 'image/jpeg'],
              maxSize: 1000000,
            },
            acceptsInteractions: {
              type: 'boolean',
              description:
                'Declaration that a feed accepts feedback interactions from a client through app.bsky.feed.sendInteractions',
            },
            labels: {
              type: 'union',
              description: 'Self-label values',
              refs: ['lex:com.atproto.label.defs#selfLabels'],
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
          },
        },
      },
    },
  },
  AppBskyFeedSendInteractions: {
    lexicon: 1,
    id: 'app.bsky.feed.sendInteractions',
    defs: {
      main: {
        type: 'procedure',
        description:
          'Send information about interactions with feed items back to the feed generator that served them.',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['interactions'],
            properties: {
              interactions: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.feed.defs#interaction',
                },
              },
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            properties: {},
          },
        },
      },
    },
  },
  AppBskyFeedDefs: {
    lexicon: 1,
    id: 'app.bsky.feed.defs',
    defs: {
      postView: {
        type: 'object',
        required: ['uri', 'cid', 'author', 'record', 'indexedAt'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
          author: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#profileViewBasic',
          },
          record: {
            type: 'unknown',
          },
          embed: {
            type: 'union',
            refs: [
              'lex:app.bsky.embed.images#view',
              'lex:app.bsky.embed.video#view',
              'lex:app.bsky.embed.external#view',
              'lex:app.bsky.embed.record#view',
              'lex:app.bsky.embed.recordWithMedia#view',
            ],
          },
          replyCount: {
            type: 'integer',
          },
          repostCount: {
            type: 'integer',
          },
          likeCount: {
            type: 'integer',
          },
          quoteCount: {
            type: 'integer',
          },
          indexedAt: {
            type: 'string',
            format: 'datetime',
          },
          viewer: {
            type: 'ref',
            ref: 'lex:app.bsky.feed.defs#viewerState',
          },
          labels: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:com.atproto.label.defs#label',
            },
          },
          threadgate: {
            type: 'ref',
            ref: 'lex:app.bsky.feed.defs#threadgateView',
          },
        },
      },
      viewerState: {
        type: 'object',
        description:
          "Metadata about the requesting account's relationship with the subject content. Only has meaningful content for authed requests.",
        properties: {
          repost: {
            type: 'string',
            format: 'at-uri',
          },
          like: {
            type: 'string',
            format: 'at-uri',
          },
          threadMuted: {
            type: 'boolean',
          },
          replyDisabled: {
            type: 'boolean',
          },
          embeddingDisabled: {
            type: 'boolean',
          },
          pinned: {
            type: 'boolean',
          },
        },
      },
      feedViewPost: {
        type: 'object',
        required: ['post'],
        properties: {
          post: {
            type: 'ref',
            ref: 'lex:app.bsky.feed.defs#postView',
          },
          reply: {
            type: 'ref',
            ref: 'lex:app.bsky.feed.defs#replyRef',
          },
          reason: {
            type: 'union',
            refs: [
              'lex:app.bsky.feed.defs#reasonRepost',
              'lex:app.bsky.feed.defs#reasonPin',
            ],
          },
          feedContext: {
            type: 'string',
            description:
              'Context provided by feed generator that may be passed back alongside interactions.',
            maxLength: 2000,
          },
        },
      },
      replyRef: {
        type: 'object',
        required: ['root', 'parent'],
        properties: {
          root: {
            type: 'union',
            refs: [
              'lex:app.bsky.feed.defs#postView',
              'lex:app.bsky.feed.defs#notFoundPost',
              'lex:app.bsky.feed.defs#blockedPost',
            ],
          },
          parent: {
            type: 'union',
            refs: [
              'lex:app.bsky.feed.defs#postView',
              'lex:app.bsky.feed.defs#notFoundPost',
              'lex:app.bsky.feed.defs#blockedPost',
            ],
          },
          grandparentAuthor: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#profileViewBasic',
            description:
              'When parent is a reply to another post, this is the author of that post.',
          },
        },
      },
      reasonRepost: {
        type: 'object',
        required: ['by', 'indexedAt'],
        properties: {
          by: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#profileViewBasic',
          },
          indexedAt: {
            type: 'string',
            format: 'datetime',
          },
        },
      },
      reasonPin: {
        type: 'object',
        properties: {},
      },
      threadViewPost: {
        type: 'object',
        required: ['post'],
        properties: {
          post: {
            type: 'ref',
            ref: 'lex:app.bsky.feed.defs#postView',
          },
          parent: {
            type: 'union',
            refs: [
              'lex:app.bsky.feed.defs#threadViewPost',
              'lex:app.bsky.feed.defs#notFoundPost',
              'lex:app.bsky.feed.defs#blockedPost',
            ],
          },
          replies: {
            type: 'array',
            items: {
              type: 'union',
              refs: [
                'lex:app.bsky.feed.defs#threadViewPost',
                'lex:app.bsky.feed.defs#notFoundPost',
                'lex:app.bsky.feed.defs#blockedPost',
              ],
            },
          },
        },
      },
      notFoundPost: {
        type: 'object',
        required: ['uri', 'notFound'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          notFound: {
            type: 'boolean',
            const: true,
          },
        },
      },
      blockedPost: {
        type: 'object',
        required: ['uri', 'blocked', 'author'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          blocked: {
            type: 'boolean',
            const: true,
          },
          author: {
            type: 'ref',
            ref: 'lex:app.bsky.feed.defs#blockedAuthor',
          },
        },
      },
      blockedAuthor: {
        type: 'object',
        required: ['did'],
        properties: {
          did: {
            type: 'string',
            format: 'did',
          },
          viewer: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#viewerState',
          },
        },
      },
      generatorView: {
        type: 'object',
        required: ['uri', 'cid', 'did', 'creator', 'displayName', 'indexedAt'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
          did: {
            type: 'string',
            format: 'did',
          },
          creator: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#profileView',
          },
          displayName: {
            type: 'string',
          },
          description: {
            type: 'string',
            maxGraphemes: 300,
            maxLength: 3000,
          },
          descriptionFacets: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:app.bsky.richtext.facet',
            },
          },
          avatar: {
            type: 'string',
            format: 'uri',
          },
          likeCount: {
            type: 'integer',
            minimum: 0,
          },
          acceptsInteractions: {
            type: 'boolean',
          },
          labels: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:com.atproto.label.defs#label',
            },
          },
          viewer: {
            type: 'ref',
            ref: 'lex:app.bsky.feed.defs#generatorViewerState',
          },
          indexedAt: {
            type: 'string',
            format: 'datetime',
          },
        },
      },
      generatorViewerState: {
        type: 'object',
        properties: {
          like: {
            type: 'string',
            format: 'at-uri',
          },
        },
      },
      skeletonFeedPost: {
        type: 'object',
        required: ['post'],
        properties: {
          post: {
            type: 'string',
            format: 'at-uri',
          },
          reason: {
            type: 'union',
            refs: [
              'lex:app.bsky.feed.defs#skeletonReasonRepost',
              'lex:app.bsky.feed.defs#skeletonReasonPin',
            ],
          },
          feedContext: {
            type: 'string',
            description:
              'Context that will be passed through to client and may be passed to feed generator back alongside interactions.',
            maxLength: 2000,
          },
        },
      },
      skeletonReasonRepost: {
        type: 'object',
        required: ['repost'],
        properties: {
          repost: {
            type: 'string',
            format: 'at-uri',
          },
        },
      },
      skeletonReasonPin: {
        type: 'object',
        properties: {},
      },
      threadgateView: {
        type: 'object',
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
          record: {
            type: 'unknown',
          },
          lists: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:app.bsky.graph.defs#listViewBasic',
            },
          },
        },
      },
      interaction: {
        type: 'object',
        properties: {
          item: {
            type: 'string',
            format: 'at-uri',
          },
          event: {
            type: 'string',
            knownValues: [
              'app.bsky.feed.defs#requestLess',
              'app.bsky.feed.defs#requestMore',
              'app.bsky.feed.defs#clickthroughItem',
              'app.bsky.feed.defs#clickthroughAuthor',
              'app.bsky.feed.defs#clickthroughReposter',
              'app.bsky.feed.defs#clickthroughEmbed',
              'app.bsky.feed.defs#interactionSeen',
              'app.bsky.feed.defs#interactionLike',
              'app.bsky.feed.defs#interactionRepost',
              'app.bsky.feed.defs#interactionReply',
              'app.bsky.feed.defs#interactionQuote',
              'app.bsky.feed.defs#interactionShare',
            ],
          },
          feedContext: {
            type: 'string',
            description:
              'Context on a feed item that was originally supplied by the feed generator on getFeedSkeleton.',
            maxLength: 2000,
          },
        },
      },
      requestLess: {
        type: 'token',
        description:
          'Request that less content like the given feed item be shown in the feed',
      },
      requestMore: {
        type: 'token',
        description:
          'Request that more content like the given feed item be shown in the feed',
      },
      clickthroughItem: {
        type: 'token',
        description: 'User clicked through to the feed item',
      },
      clickthroughAuthor: {
        type: 'token',
        description: 'User clicked through to the author of the feed item',
      },
      clickthroughReposter: {
        type: 'token',
        description: 'User clicked through to the reposter of the feed item',
      },
      clickthroughEmbed: {
        type: 'token',
        description:
          'User clicked through to the embedded content of the feed item',
      },
      interactionSeen: {
        type: 'token',
        description: 'Feed item was seen by user',
      },
      interactionLike: {
        type: 'token',
        description: 'User liked the feed item',
      },
      interactionRepost: {
        type: 'token',
        description: 'User reposted the feed item',
      },
      interactionReply: {
        type: 'token',
        description: 'User replied to the feed item',
      },
      interactionQuote: {
        type: 'token',
        description: 'User quoted the feed item',
      },
      interactionShare: {
        type: 'token',
        description: 'User shared the feed item',
      },
    },
  },
  AppBskyFeedGetFeedGenerators: {
    lexicon: 1,
    id: 'app.bsky.feed.getFeedGenerators',
    defs: {
      main: {
        type: 'query',
        description: 'Get information about a list of feed generators.',
        parameters: {
          type: 'params',
          required: ['feeds'],
          properties: {
            feeds: {
              type: 'array',
              items: {
                type: 'string',
                format: 'at-uri',
              },
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['feeds'],
            properties: {
              feeds: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.feed.defs#generatorView',
                },
              },
            },
          },
        },
      },
    },
  },
  AppBskyFeedGetTimeline: {
    lexicon: 1,
    id: 'app.bsky.feed.getTimeline',
    defs: {
      main: {
        type: 'query',
        description:
          "Get a view of the requesting account's home timeline. This is expected to be some form of reverse-chronological feed.",
        parameters: {
          type: 'params',
          properties: {
            algorithm: {
              type: 'string',
              description:
                "Variant 'algorithm' for timeline. Implementation-specific. NOTE: most feed flexibility has been moved to feed generator mechanism.",
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['feed'],
            properties: {
              cursor: {
                type: 'string',
              },
              feed: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.feed.defs#feedViewPost',
                },
              },
            },
          },
        },
      },
    },
  },
  AppBskyFeedGetFeedGenerator: {
    lexicon: 1,
    id: 'app.bsky.feed.getFeedGenerator',
    defs: {
      main: {
        type: 'query',
        description:
          'Get information about a feed generator. Implemented by AppView.',
        parameters: {
          type: 'params',
          required: ['feed'],
          properties: {
            feed: {
              type: 'string',
              format: 'at-uri',
              description: 'AT-URI of the feed generator record.',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['view', 'isOnline', 'isValid'],
            properties: {
              view: {
                type: 'ref',
                ref: 'lex:app.bsky.feed.defs#generatorView',
              },
              isOnline: {
                type: 'boolean',
                description:
                  'Indicates whether the feed generator service has been online recently, or else seems to be inactive.',
              },
              isValid: {
                type: 'boolean',
                description:
                  'Indicates whether the feed generator service is compatible with the record declaration.',
              },
            },
          },
        },
      },
    },
  },
  AppBskyFeedGetAuthorFeed: {
    lexicon: 1,
    id: 'app.bsky.feed.getAuthorFeed',
    defs: {
      main: {
        type: 'query',
        description:
          "Get a view of an actor's 'author feed' (post and reposts by the author). Does not require auth.",
        parameters: {
          type: 'params',
          required: ['actor'],
          properties: {
            actor: {
              type: 'string',
              format: 'at-identifier',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
            filter: {
              type: 'string',
              description:
                'Combinations of post/repost types to include in response.',
              knownValues: [
                'posts_with_replies',
                'posts_no_replies',
                'posts_with_media',
                'posts_and_author_threads',
              ],
              default: 'posts_with_replies',
            },
            includePins: {
              type: 'boolean',
              default: false,
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['feed'],
            properties: {
              cursor: {
                type: 'string',
              },
              feed: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.feed.defs#feedViewPost',
                },
              },
            },
          },
        },
        errors: [
          {
            name: 'BlockedActor',
          },
          {
            name: 'BlockedByActor',
          },
        ],
      },
    },
  },
  AppBskyFeedGetLikes: {
    lexicon: 1,
    id: 'app.bsky.feed.getLikes',
    defs: {
      main: {
        type: 'query',
        description:
          'Get like records which reference a subject (by AT-URI and CID).',
        parameters: {
          type: 'params',
          required: ['uri'],
          properties: {
            uri: {
              type: 'string',
              format: 'at-uri',
              description: 'AT-URI of the subject (eg, a post record).',
            },
            cid: {
              type: 'string',
              format: 'cid',
              description:
                'CID of the subject record (aka, specific version of record), to filter likes.',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['uri', 'likes'],
            properties: {
              uri: {
                type: 'string',
                format: 'at-uri',
              },
              cid: {
                type: 'string',
                format: 'cid',
              },
              cursor: {
                type: 'string',
              },
              likes: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.feed.getLikes#like',
                },
              },
            },
          },
        },
      },
      like: {
        type: 'object',
        required: ['indexedAt', 'createdAt', 'actor'],
        properties: {
          indexedAt: {
            type: 'string',
            format: 'datetime',
          },
          createdAt: {
            type: 'string',
            format: 'datetime',
          },
          actor: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#profileView',
          },
        },
      },
    },
  },
  AppBskyFeedPostgate: {
    lexicon: 1,
    id: 'app.bsky.feed.postgate',
    defs: {
      main: {
        type: 'record',
        key: 'tid',
        description:
          'Record defining interaction rules for a post. The record key (rkey) of the postgate record must match the record key of the post, and that record must be in the same repository.',
        record: {
          type: 'object',
          required: ['post', 'createdAt'],
          properties: {
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
            post: {
              type: 'string',
              format: 'at-uri',
              description: 'Reference (AT-URI) to the post record.',
            },
            detachedEmbeddingUris: {
              type: 'array',
              maxLength: 50,
              items: {
                type: 'string',
                format: 'at-uri',
              },
              description:
                'List of AT-URIs embedding this post that the author has detached from.',
            },
            embeddingRules: {
              type: 'array',
              maxLength: 5,
              items: {
                type: 'union',
                refs: ['lex:app.bsky.feed.postgate#disableRule'],
              },
            },
          },
        },
      },
      disableRule: {
        type: 'object',
        description: 'Disables embedding of this post.',
        properties: {},
      },
    },
  },
  AppBskyFeedThreadgate: {
    lexicon: 1,
    id: 'app.bsky.feed.threadgate',
    defs: {
      main: {
        type: 'record',
        key: 'tid',
        description:
          "Record defining interaction gating rules for a thread (aka, reply controls). The record key (rkey) of the threadgate record must match the record key of the thread's root post, and that record must be in the same repository.",
        record: {
          type: 'object',
          required: ['post', 'createdAt'],
          properties: {
            post: {
              type: 'string',
              format: 'at-uri',
              description: 'Reference (AT-URI) to the post record.',
            },
            allow: {
              type: 'array',
              maxLength: 5,
              items: {
                type: 'union',
                refs: [
                  'lex:app.bsky.feed.threadgate#mentionRule',
                  'lex:app.bsky.feed.threadgate#followingRule',
                  'lex:app.bsky.feed.threadgate#listRule',
                ],
              },
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
            hiddenReplies: {
              type: 'array',
              maxLength: 50,
              items: {
                type: 'string',
                format: 'at-uri',
              },
              description: 'List of hidden reply URIs.',
            },
          },
        },
      },
      mentionRule: {
        type: 'object',
        description: 'Allow replies from actors mentioned in your post.',
        properties: {},
      },
      followingRule: {
        type: 'object',
        description: 'Allow replies from actors you follow.',
        properties: {},
      },
      listRule: {
        type: 'object',
        description: 'Allow replies from actors on a list.',
        required: ['list'],
        properties: {
          list: {
            type: 'string',
            format: 'at-uri',
          },
        },
      },
    },
  },
  AppBskyFeedGetPostThread: {
    lexicon: 1,
    id: 'app.bsky.feed.getPostThread',
    defs: {
      main: {
        type: 'query',
        description:
          'Get posts in a thread. Does not require auth, but additional metadata and filtering will be applied for authed requests.',
        parameters: {
          type: 'params',
          required: ['uri'],
          properties: {
            uri: {
              type: 'string',
              format: 'at-uri',
              description: 'Reference (AT-URI) to post record.',
            },
            depth: {
              type: 'integer',
              description:
                'How many levels of reply depth should be included in response.',
              default: 6,
              minimum: 0,
              maximum: 1000,
            },
            parentHeight: {
              type: 'integer',
              description:
                'How many levels of parent (and grandparent, etc) post to include.',
              default: 80,
              minimum: 0,
              maximum: 1000,
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['thread'],
            properties: {
              thread: {
                type: 'union',
                refs: [
                  'lex:app.bsky.feed.defs#threadViewPost',
                  'lex:app.bsky.feed.defs#notFoundPost',
                  'lex:app.bsky.feed.defs#blockedPost',
                ],
              },
              threadgate: {
                type: 'ref',
                ref: 'lex:app.bsky.feed.defs#threadgateView',
              },
            },
          },
        },
        errors: [
          {
            name: 'NotFound',
          },
        ],
      },
    },
  },
  AppBskyFeedGetActorLikes: {
    lexicon: 1,
    id: 'app.bsky.feed.getActorLikes',
    defs: {
      main: {
        type: 'query',
        description:
          'Get a list of posts liked by an actor. Requires auth, actor must be the requesting account.',
        parameters: {
          type: 'params',
          required: ['actor'],
          properties: {
            actor: {
              type: 'string',
              format: 'at-identifier',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['feed'],
            properties: {
              cursor: {
                type: 'string',
              },
              feed: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.feed.defs#feedViewPost',
                },
              },
            },
          },
        },
        errors: [
          {
            name: 'BlockedActor',
          },
          {
            name: 'BlockedByActor',
          },
        ],
      },
    },
  },
  AppBskyFeedLike: {
    lexicon: 1,
    id: 'app.bsky.feed.like',
    defs: {
      main: {
        type: 'record',
        description: "Record declaring a 'like' of a piece of subject content.",
        key: 'tid',
        record: {
          type: 'object',
          required: ['subject', 'createdAt'],
          properties: {
            subject: {
              type: 'ref',
              ref: 'lex:com.atproto.repo.strongRef',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
          },
        },
      },
    },
  },
  AppBskyFeedGetRepostedBy: {
    lexicon: 1,
    id: 'app.bsky.feed.getRepostedBy',
    defs: {
      main: {
        type: 'query',
        description: 'Get a list of reposts for a given post.',
        parameters: {
          type: 'params',
          required: ['uri'],
          properties: {
            uri: {
              type: 'string',
              format: 'at-uri',
              description: 'Reference (AT-URI) of post record',
            },
            cid: {
              type: 'string',
              format: 'cid',
              description:
                'If supplied, filters to reposts of specific version (by CID) of the post record.',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['uri', 'repostedBy'],
            properties: {
              uri: {
                type: 'string',
                format: 'at-uri',
              },
              cid: {
                type: 'string',
                format: 'cid',
              },
              cursor: {
                type: 'string',
              },
              repostedBy: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.actor.defs#profileView',
                },
              },
            },
          },
        },
      },
    },
  },
  AppBskyFeedRepost: {
    lexicon: 1,
    id: 'app.bsky.feed.repost',
    defs: {
      main: {
        description:
          "Record representing a 'repost' of an existing Bluesky post.",
        type: 'record',
        key: 'tid',
        record: {
          type: 'object',
          required: ['subject', 'createdAt'],
          properties: {
            subject: {
              type: 'ref',
              ref: 'lex:com.atproto.repo.strongRef',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
          },
        },
      },
    },
  },
  AppBskyFeedDescribeFeedGenerator: {
    lexicon: 1,
    id: 'app.bsky.feed.describeFeedGenerator',
    defs: {
      main: {
        type: 'query',
        description:
          'Get information about a feed generator, including policies and offered feed URIs. Does not require auth; implemented by Feed Generator services (not App View).',
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['did', 'feeds'],
            properties: {
              did: {
                type: 'string',
                format: 'did',
              },
              feeds: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.feed.describeFeedGenerator#feed',
                },
              },
              links: {
                type: 'ref',
                ref: 'lex:app.bsky.feed.describeFeedGenerator#links',
              },
            },
          },
        },
      },
      feed: {
        type: 'object',
        required: ['uri'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
        },
      },
      links: {
        type: 'object',
        properties: {
          privacyPolicy: {
            type: 'string',
          },
          termsOfService: {
            type: 'string',
          },
        },
      },
    },
  },
  AppBskyFeedSearchPosts: {
    lexicon: 1,
    id: 'app.bsky.feed.searchPosts',
    defs: {
      main: {
        type: 'query',
        description:
          'Find posts matching search criteria, returning views of those posts.',
        parameters: {
          type: 'params',
          required: ['q'],
          properties: {
            q: {
              type: 'string',
              description:
                'Search query string; syntax, phrase, boolean, and faceting is unspecified, but Lucene query syntax is recommended.',
            },
            sort: {
              type: 'string',
              knownValues: ['top', 'latest'],
              default: 'latest',
              description: 'Specifies the ranking order of results.',
            },
            since: {
              type: 'string',
              description:
                "Filter results for posts after the indicated datetime (inclusive). Expected to use 'sortAt' timestamp, which may not match 'createdAt'. Can be a datetime, or just an ISO date (YYYY-MM-DD).",
            },
            until: {
              type: 'string',
              description:
                "Filter results for posts before the indicated datetime (not inclusive). Expected to use 'sortAt' timestamp, which may not match 'createdAt'. Can be a datetime, or just an ISO date (YYY-MM-DD).",
            },
            mentions: {
              type: 'string',
              format: 'at-identifier',
              description:
                'Filter to posts which mention the given account. Handles are resolved to DID before query-time. Only matches rich-text facet mentions.',
            },
            author: {
              type: 'string',
              format: 'at-identifier',
              description:
                'Filter to posts by the given account. Handles are resolved to DID before query-time.',
            },
            lang: {
              type: 'string',
              format: 'language',
              description:
                'Filter to posts in the given language. Expected to be based on post language field, though server may override language detection.',
            },
            domain: {
              type: 'string',
              description:
                'Filter to posts with URLs (facet links or embeds) linking to the given domain (hostname). Server may apply hostname normalization.',
            },
            url: {
              type: 'string',
              format: 'uri',
              description:
                'Filter to posts with links (facet links or embeds) pointing to this URL. Server may apply URL normalization or fuzzy matching.',
            },
            tag: {
              type: 'array',
              items: {
                type: 'string',
                maxLength: 640,
                maxGraphemes: 64,
              },
              description:
                "Filter to posts with the given tag (hashtag), based on rich-text facet or tag field. Do not include the hash (#) prefix. Multiple tags can be specified, with 'AND' matching.",
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 25,
            },
            cursor: {
              type: 'string',
              description:
                'Optional pagination mechanism; may not necessarily allow scrolling through entire result set.',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['posts'],
            properties: {
              cursor: {
                type: 'string',
              },
              hitsTotal: {
                type: 'integer',
                description:
                  'Count of search hits. Optional, may be rounded/truncated, and may not be possible to paginate through all hits.',
              },
              posts: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.feed.defs#postView',
                },
              },
            },
          },
        },
        errors: [
          {
            name: 'BadQueryString',
          },
        ],
      },
    },
  },
  AppBskyFeedGetPosts: {
    lexicon: 1,
    id: 'app.bsky.feed.getPosts',
    defs: {
      main: {
        type: 'query',
        description:
          "Gets post views for a specified list of posts (by AT-URI). This is sometimes referred to as 'hydrating' a 'feed skeleton'.",
        parameters: {
          type: 'params',
          required: ['uris'],
          properties: {
            uris: {
              type: 'array',
              description: 'List of post AT-URIs to return hydrated views for.',
              items: {
                type: 'string',
                format: 'at-uri',
              },
              maxLength: 25,
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['posts'],
            properties: {
              posts: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.feed.defs#postView',
                },
              },
            },
          },
        },
      },
    },
  },
  AppBskyFeedGetFeed: {
    lexicon: 1,
    id: 'app.bsky.feed.getFeed',
    defs: {
      main: {
        type: 'query',
        description:
          "Get a hydrated feed from an actor's selected feed generator. Implemented by App View.",
        parameters: {
          type: 'params',
          required: ['feed'],
          properties: {
            feed: {
              type: 'string',
              format: 'at-uri',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['feed'],
            properties: {
              cursor: {
                type: 'string',
              },
              feed: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.feed.defs#feedViewPost',
                },
              },
            },
          },
        },
        errors: [
          {
            name: 'UnknownFeed',
          },
        ],
      },
    },
  },
  AppBskyFeedGetQuotes: {
    lexicon: 1,
    id: 'app.bsky.feed.getQuotes',
    defs: {
      main: {
        type: 'query',
        description: 'Get a list of quotes for a given post.',
        parameters: {
          type: 'params',
          required: ['uri'],
          properties: {
            uri: {
              type: 'string',
              format: 'at-uri',
              description: 'Reference (AT-URI) of post record',
            },
            cid: {
              type: 'string',
              format: 'cid',
              description:
                'If supplied, filters to quotes of specific version (by CID) of the post record.',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['uri', 'posts'],
            properties: {
              uri: {
                type: 'string',
                format: 'at-uri',
              },
              cid: {
                type: 'string',
                format: 'cid',
              },
              cursor: {
                type: 'string',
              },
              posts: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.feed.defs#postView',
                },
              },
            },
          },
        },
      },
    },
  },
  AppBskyFeedGetFeedSkeleton: {
    lexicon: 1,
    id: 'app.bsky.feed.getFeedSkeleton',
    defs: {
      main: {
        type: 'query',
        description:
          'Get a skeleton of a feed provided by a feed generator. Auth is optional, depending on provider requirements, and provides the DID of the requester. Implemented by Feed Generator Service.',
        parameters: {
          type: 'params',
          required: ['feed'],
          properties: {
            feed: {
              type: 'string',
              format: 'at-uri',
              description:
                'Reference to feed generator record describing the specific feed being requested.',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['feed'],
            properties: {
              cursor: {
                type: 'string',
              },
              feed: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.feed.defs#skeletonFeedPost',
                },
              },
            },
          },
        },
        errors: [
          {
            name: 'UnknownFeed',
          },
        ],
      },
    },
  },
  AppBskyFeedGetListFeed: {
    lexicon: 1,
    id: 'app.bsky.feed.getListFeed',
    defs: {
      main: {
        type: 'query',
        description:
          'Get a feed of recent posts from a list (posts and reposts from any actors on the list). Does not require auth.',
        parameters: {
          type: 'params',
          required: ['list'],
          properties: {
            list: {
              type: 'string',
              format: 'at-uri',
              description: 'Reference (AT-URI) to the list record.',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['feed'],
            properties: {
              cursor: {
                type: 'string',
              },
              feed: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.feed.defs#feedViewPost',
                },
              },
            },
          },
        },
        errors: [
          {
            name: 'UnknownList',
          },
        ],
      },
    },
  },
  AppBskyFeedGetSuggestedFeeds: {
    lexicon: 1,
    id: 'app.bsky.feed.getSuggestedFeeds',
    defs: {
      main: {
        type: 'query',
        description:
          'Get a list of suggested feeds (feed generators) for the requesting account.',
        parameters: {
          type: 'params',
          properties: {
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['feeds'],
            properties: {
              cursor: {
                type: 'string',
              },
              feeds: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.feed.defs#generatorView',
                },
              },
            },
          },
        },
      },
    },
  },
  AppBskyFeedGetActorFeeds: {
    lexicon: 1,
    id: 'app.bsky.feed.getActorFeeds',
    defs: {
      main: {
        type: 'query',
        description:
          "Get a list of feeds (feed generator records) created by the actor (in the actor's repo).",
        parameters: {
          type: 'params',
          required: ['actor'],
          properties: {
            actor: {
              type: 'string',
              format: 'at-identifier',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['feeds'],
            properties: {
              cursor: {
                type: 'string',
              },
              feeds: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.feed.defs#generatorView',
                },
              },
            },
          },
        },
      },
    },
  },
  AppBskyFeedPost: {
    lexicon: 1,
    id: 'app.bsky.feed.post',
    defs: {
      main: {
        type: 'record',
        description: 'Record containing a Bluesky post.',
        key: 'tid',
        record: {
          type: 'object',
          required: ['text', 'createdAt'],
          properties: {
            text: {
              type: 'string',
              maxLength: 3000,
              maxGraphemes: 300,
              description:
                'The primary post content. May be an empty string, if there are embeds.',
            },
            entities: {
              type: 'array',
              description: 'DEPRECATED: replaced by app.bsky.richtext.facet.',
              items: {
                type: 'ref',
                ref: 'lex:app.bsky.feed.post#entity',
              },
            },
            facets: {
              type: 'array',
              description:
                'Annotations of text (mentions, URLs, hashtags, etc)',
              items: {
                type: 'ref',
                ref: 'lex:app.bsky.richtext.facet',
              },
            },
            reply: {
              type: 'ref',
              ref: 'lex:app.bsky.feed.post#replyRef',
            },
            embed: {
              type: 'union',
              refs: [
                'lex:app.bsky.embed.images',
                'lex:app.bsky.embed.video',
                'lex:app.bsky.embed.external',
                'lex:app.bsky.embed.record',
                'lex:app.bsky.embed.recordWithMedia',
              ],
            },
            langs: {
              type: 'array',
              description:
                'Indicates human language of post primary text content.',
              maxLength: 3,
              items: {
                type: 'string',
                format: 'language',
              },
            },
            labels: {
              type: 'union',
              description:
                'Self-label values for this post. Effectively content warnings.',
              refs: ['lex:com.atproto.label.defs#selfLabels'],
            },
            tags: {
              type: 'array',
              description:
                'Additional hashtags, in addition to any included in post text and facets.',
              maxLength: 8,
              items: {
                type: 'string',
                maxLength: 640,
                maxGraphemes: 64,
              },
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description:
                'Client-declared timestamp when this post was originally created.',
            },
          },
        },
      },
      replyRef: {
        type: 'object',
        required: ['root', 'parent'],
        properties: {
          root: {
            type: 'ref',
            ref: 'lex:com.atproto.repo.strongRef',
          },
          parent: {
            type: 'ref',
            ref: 'lex:com.atproto.repo.strongRef',
          },
        },
      },
      entity: {
        type: 'object',
        description: 'Deprecated: use facets instead.',
        required: ['index', 'type', 'value'],
        properties: {
          index: {
            type: 'ref',
            ref: 'lex:app.bsky.feed.post#textSlice',
          },
          type: {
            type: 'string',
            description: "Expected values are 'mention' and 'link'.",
          },
          value: {
            type: 'string',
          },
        },
      },
      textSlice: {
        type: 'object',
        description:
          'Deprecated. Use app.bsky.richtext instead -- A text segment. Start is inclusive, end is exclusive. Indices are for utf16-encoded strings.',
        required: ['start', 'end'],
        properties: {
          start: {
            type: 'integer',
            minimum: 0,
          },
          end: {
            type: 'integer',
            minimum: 0,
          },
        },
      },
    },
  },
  AppBskyRichtextFacet: {
    lexicon: 1,
    id: 'app.bsky.richtext.facet',
    defs: {
      main: {
        type: 'object',
        description: 'Annotation of a sub-string within rich text.',
        required: ['index', 'features'],
        properties: {
          index: {
            type: 'ref',
            ref: 'lex:app.bsky.richtext.facet#byteSlice',
          },
          features: {
            type: 'array',
            items: {
              type: 'union',
              refs: [
                'lex:app.bsky.richtext.facet#mention',
                'lex:app.bsky.richtext.facet#link',
                'lex:app.bsky.richtext.facet#tag',
              ],
            },
          },
        },
      },
      mention: {
        type: 'object',
        description:
          "Facet feature for mention of another account. The text is usually a handle, including a '@' prefix, but the facet reference is a DID.",
        required: ['did'],
        properties: {
          did: {
            type: 'string',
            format: 'did',
          },
        },
      },
      link: {
        type: 'object',
        description:
          'Facet feature for a URL. The text URL may have been simplified or truncated, but the facet reference should be a complete URL.',
        required: ['uri'],
        properties: {
          uri: {
            type: 'string',
            format: 'uri',
          },
        },
      },
      tag: {
        type: 'object',
        description:
          "Facet feature for a hashtag. The text usually includes a '#' prefix, but the facet reference should not (except in the case of 'double hash tags').",
        required: ['tag'],
        properties: {
          tag: {
            type: 'string',
            maxLength: 640,
            maxGraphemes: 64,
          },
        },
      },
      byteSlice: {
        type: 'object',
        description:
          'Specifies the sub-string range a facet feature applies to. Start index is inclusive, end index is exclusive. Indices are zero-indexed, counting bytes of the UTF-8 encoded text. NOTE: some languages, like Javascript, use UTF-16 or Unicode codepoints for string slice indexing; in these languages, convert to byte arrays before working with facets.',
        required: ['byteStart', 'byteEnd'],
        properties: {
          byteStart: {
            type: 'integer',
            minimum: 0,
          },
          byteEnd: {
            type: 'integer',
            minimum: 0,
          },
        },
      },
    },
  },
  AppBskyActorSearchActorsTypeahead: {
    lexicon: 1,
    id: 'app.bsky.actor.searchActorsTypeahead',
    defs: {
      main: {
        type: 'query',
        description:
          'Find actor suggestions for a prefix search term. Expected use is for auto-completion during text field entry. Does not require auth.',
        parameters: {
          type: 'params',
          properties: {
            term: {
              type: 'string',
              description: "DEPRECATED: use 'q' instead.",
            },
            q: {
              type: 'string',
              description: 'Search query prefix; not a full query string.',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 10,
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['actors'],
            properties: {
              actors: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.actor.defs#profileViewBasic',
                },
              },
            },
          },
        },
      },
    },
  },
  AppBskyActorDefs: {
    lexicon: 1,
    id: 'app.bsky.actor.defs',
    defs: {
      profileViewBasic: {
        type: 'object',
        required: ['did', 'handle'],
        properties: {
          did: {
            type: 'string',
            format: 'did',
          },
          handle: {
            type: 'string',
            format: 'handle',
          },
          displayName: {
            type: 'string',
            maxGraphemes: 64,
            maxLength: 640,
          },
          avatar: {
            type: 'string',
            format: 'uri',
          },
          associated: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#profileAssociated',
          },
          viewer: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#viewerState',
          },
          labels: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:com.atproto.label.defs#label',
            },
          },
          createdAt: {
            type: 'string',
            format: 'datetime',
          },
        },
      },
      profileView: {
        type: 'object',
        required: ['did', 'handle'],
        properties: {
          did: {
            type: 'string',
            format: 'did',
          },
          handle: {
            type: 'string',
            format: 'handle',
          },
          displayName: {
            type: 'string',
            maxGraphemes: 64,
            maxLength: 640,
          },
          description: {
            type: 'string',
            maxGraphemes: 256,
            maxLength: 2560,
          },
          avatar: {
            type: 'string',
            format: 'uri',
          },
          associated: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#profileAssociated',
          },
          indexedAt: {
            type: 'string',
            format: 'datetime',
          },
          createdAt: {
            type: 'string',
            format: 'datetime',
          },
          viewer: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#viewerState',
          },
          labels: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:com.atproto.label.defs#label',
            },
          },
        },
      },
      profileViewDetailed: {
        type: 'object',
        required: ['did', 'handle'],
        properties: {
          did: {
            type: 'string',
            format: 'did',
          },
          handle: {
            type: 'string',
            format: 'handle',
          },
          displayName: {
            type: 'string',
            maxGraphemes: 64,
            maxLength: 640,
          },
          description: {
            type: 'string',
            maxGraphemes: 256,
            maxLength: 2560,
          },
          avatar: {
            type: 'string',
            format: 'uri',
          },
          banner: {
            type: 'string',
            format: 'uri',
          },
          followersCount: {
            type: 'integer',
          },
          followsCount: {
            type: 'integer',
          },
          postsCount: {
            type: 'integer',
          },
          associated: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#profileAssociated',
          },
          joinedViaStarterPack: {
            type: 'ref',
            ref: 'lex:app.bsky.graph.defs#starterPackViewBasic',
          },
          indexedAt: {
            type: 'string',
            format: 'datetime',
          },
          createdAt: {
            type: 'string',
            format: 'datetime',
          },
          viewer: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#viewerState',
          },
          labels: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:com.atproto.label.defs#label',
            },
          },
          pinnedPost: {
            type: 'ref',
            ref: 'lex:com.atproto.repo.strongRef',
          },
        },
      },
      profileAssociated: {
        type: 'object',
        properties: {
          lists: {
            type: 'integer',
          },
          feedgens: {
            type: 'integer',
          },
          starterPacks: {
            type: 'integer',
          },
          labeler: {
            type: 'boolean',
          },
          chat: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#profileAssociatedChat',
          },
        },
      },
      profileAssociatedChat: {
        type: 'object',
        required: ['allowIncoming'],
        properties: {
          allowIncoming: {
            type: 'string',
            knownValues: ['all', 'none', 'following'],
          },
        },
      },
      viewerState: {
        type: 'object',
        description:
          "Metadata about the requesting account's relationship with the subject account. Only has meaningful content for authed requests.",
        properties: {
          muted: {
            type: 'boolean',
          },
          mutedByList: {
            type: 'ref',
            ref: 'lex:app.bsky.graph.defs#listViewBasic',
          },
          blockedBy: {
            type: 'boolean',
          },
          blocking: {
            type: 'string',
            format: 'at-uri',
          },
          blockingByList: {
            type: 'ref',
            ref: 'lex:app.bsky.graph.defs#listViewBasic',
          },
          following: {
            type: 'string',
            format: 'at-uri',
          },
          followedBy: {
            type: 'string',
            format: 'at-uri',
          },
          knownFollowers: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#knownFollowers',
          },
        },
      },
      knownFollowers: {
        type: 'object',
        description: "The subject's followers whom you also follow",
        required: ['count', 'followers'],
        properties: {
          count: {
            type: 'integer',
          },
          followers: {
            type: 'array',
            minLength: 0,
            maxLength: 5,
            items: {
              type: 'ref',
              ref: 'lex:app.bsky.actor.defs#profileViewBasic',
            },
          },
        },
      },
      preferences: {
        type: 'array',
        items: {
          type: 'union',
          refs: [
            'lex:app.bsky.actor.defs#adultContentPref',
            'lex:app.bsky.actor.defs#contentLabelPref',
            'lex:app.bsky.actor.defs#savedFeedsPref',
            'lex:app.bsky.actor.defs#savedFeedsPrefV2',
            'lex:app.bsky.actor.defs#personalDetailsPref',
            'lex:app.bsky.actor.defs#feedViewPref',
            'lex:app.bsky.actor.defs#threadViewPref',
            'lex:app.bsky.actor.defs#interestsPref',
            'lex:app.bsky.actor.defs#mutedWordsPref',
            'lex:app.bsky.actor.defs#hiddenPostsPref',
            'lex:app.bsky.actor.defs#bskyAppStatePref',
            'lex:app.bsky.actor.defs#labelersPref',
          ],
        },
      },
      adultContentPref: {
        type: 'object',
        required: ['enabled'],
        properties: {
          enabled: {
            type: 'boolean',
            default: false,
          },
        },
      },
      contentLabelPref: {
        type: 'object',
        required: ['label', 'visibility'],
        properties: {
          labelerDid: {
            type: 'string',
            description:
              'Which labeler does this preference apply to? If undefined, applies globally.',
            format: 'did',
          },
          label: {
            type: 'string',
          },
          visibility: {
            type: 'string',
            knownValues: ['ignore', 'show', 'warn', 'hide'],
          },
        },
      },
      savedFeed: {
        type: 'object',
        required: ['id', 'type', 'value', 'pinned'],
        properties: {
          id: {
            type: 'string',
          },
          type: {
            type: 'string',
            knownValues: ['feed', 'list', 'timeline'],
          },
          value: {
            type: 'string',
          },
          pinned: {
            type: 'boolean',
          },
        },
      },
      savedFeedsPrefV2: {
        type: 'object',
        required: ['items'],
        properties: {
          items: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:app.bsky.actor.defs#savedFeed',
            },
          },
        },
      },
      savedFeedsPref: {
        type: 'object',
        required: ['pinned', 'saved'],
        properties: {
          pinned: {
            type: 'array',
            items: {
              type: 'string',
              format: 'at-uri',
            },
          },
          saved: {
            type: 'array',
            items: {
              type: 'string',
              format: 'at-uri',
            },
          },
          timelineIndex: {
            type: 'integer',
          },
        },
      },
      personalDetailsPref: {
        type: 'object',
        properties: {
          birthDate: {
            type: 'string',
            format: 'datetime',
            description: 'The birth date of account owner.',
          },
        },
      },
      feedViewPref: {
        type: 'object',
        required: ['feed'],
        properties: {
          feed: {
            type: 'string',
            description:
              'The URI of the feed, or an identifier which describes the feed.',
          },
          hideReplies: {
            type: 'boolean',
            description: 'Hide replies in the feed.',
          },
          hideRepliesByUnfollowed: {
            type: 'boolean',
            description:
              'Hide replies in the feed if they are not by followed users.',
            default: true,
          },
          hideRepliesByLikeCount: {
            type: 'integer',
            description:
              'Hide replies in the feed if they do not have this number of likes.',
          },
          hideReposts: {
            type: 'boolean',
            description: 'Hide reposts in the feed.',
          },
          hideQuotePosts: {
            type: 'boolean',
            description: 'Hide quote posts in the feed.',
          },
        },
      },
      threadViewPref: {
        type: 'object',
        properties: {
          sort: {
            type: 'string',
            description: 'Sorting mode for threads.',
            knownValues: [
              'oldest',
              'newest',
              'most-likes',
              'random',
              'hotness',
            ],
          },
          prioritizeFollowedUsers: {
            type: 'boolean',
            description: 'Show followed users at the top of all replies.',
          },
        },
      },
      interestsPref: {
        type: 'object',
        required: ['tags'],
        properties: {
          tags: {
            type: 'array',
            maxLength: 100,
            items: {
              type: 'string',
              maxLength: 640,
              maxGraphemes: 64,
            },
            description:
              "A list of tags which describe the account owner's interests gathered during onboarding.",
          },
        },
      },
      mutedWordTarget: {
        type: 'string',
        knownValues: ['content', 'tag'],
        maxLength: 640,
        maxGraphemes: 64,
      },
      mutedWord: {
        type: 'object',
        description: 'A word that the account owner has muted.',
        required: ['value', 'targets'],
        properties: {
          id: {
            type: 'string',
          },
          value: {
            type: 'string',
            description: 'The muted word itself.',
            maxLength: 10000,
            maxGraphemes: 1000,
          },
          targets: {
            type: 'array',
            description: 'The intended targets of the muted word.',
            items: {
              type: 'ref',
              ref: 'lex:app.bsky.actor.defs#mutedWordTarget',
            },
          },
          actorTarget: {
            type: 'string',
            description:
              'Groups of users to apply the muted word to. If undefined, applies to all users.',
            knownValues: ['all', 'exclude-following'],
            default: 'all',
          },
          expiresAt: {
            type: 'string',
            format: 'datetime',
            description:
              'The date and time at which the muted word will expire and no longer be applied.',
          },
        },
      },
      mutedWordsPref: {
        type: 'object',
        required: ['items'],
        properties: {
          items: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:app.bsky.actor.defs#mutedWord',
            },
            description: 'A list of words the account owner has muted.',
          },
        },
      },
      hiddenPostsPref: {
        type: 'object',
        required: ['items'],
        properties: {
          items: {
            type: 'array',
            items: {
              type: 'string',
              format: 'at-uri',
            },
            description:
              'A list of URIs of posts the account owner has hidden.',
          },
        },
      },
      labelersPref: {
        type: 'object',
        required: ['labelers'],
        properties: {
          labelers: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:app.bsky.actor.defs#labelerPrefItem',
            },
          },
        },
      },
      labelerPrefItem: {
        type: 'object',
        required: ['did'],
        properties: {
          did: {
            type: 'string',
            format: 'did',
          },
        },
      },
      bskyAppStatePref: {
        description:
          "A grab bag of state that's specific to the bsky.app program. Third-party apps shouldn't use this.",
        type: 'object',
        properties: {
          activeProgressGuide: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#bskyAppProgressGuide',
          },
          queuedNudges: {
            description:
              'An array of tokens which identify nudges (modals, popups, tours, highlight dots) that should be shown to the user.',
            type: 'array',
            maxLength: 1000,
            items: {
              type: 'string',
              maxLength: 100,
            },
          },
          nuxs: {
            description: 'Storage for NUXs the user has encountered.',
            type: 'array',
            maxLength: 100,
            items: {
              type: 'ref',
              ref: 'lex:app.bsky.actor.defs#nux',
            },
          },
        },
      },
      bskyAppProgressGuide: {
        description:
          'If set, an active progress guide. Once completed, can be set to undefined. Should have unspecced fields tracking progress.',
        type: 'object',
        required: ['guide'],
        properties: {
          guide: {
            type: 'string',
            maxLength: 100,
          },
        },
      },
      nux: {
        type: 'object',
        description: 'A new user experiences (NUX) storage object',
        required: ['id', 'completed'],
        properties: {
          id: {
            type: 'string',
            maxLength: 100,
          },
          completed: {
            type: 'boolean',
            default: false,
          },
          data: {
            description:
              'Arbitrary data for the NUX. The structure is defined by the NUX itself. Limited to 300 characters.',
            type: 'string',
            maxLength: 3000,
            maxGraphemes: 300,
          },
          expiresAt: {
            type: 'string',
            format: 'datetime',
            description:
              'The date and time at which the NUX will expire and should be considered completed.',
          },
        },
      },
    },
  },
  AppBskyActorPutPreferences: {
    lexicon: 1,
    id: 'app.bsky.actor.putPreferences',
    defs: {
      main: {
        type: 'procedure',
        description: 'Set the private preferences attached to the account.',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['preferences'],
            properties: {
              preferences: {
                type: 'ref',
                ref: 'lex:app.bsky.actor.defs#preferences',
              },
            },
          },
        },
      },
    },
  },
  AppBskyActorGetProfile: {
    lexicon: 1,
    id: 'app.bsky.actor.getProfile',
    defs: {
      main: {
        type: 'query',
        description:
          'Get detailed profile view of an actor. Does not require auth, but contains relevant metadata with auth.',
        parameters: {
          type: 'params',
          required: ['actor'],
          properties: {
            actor: {
              type: 'string',
              format: 'at-identifier',
              description: 'Handle or DID of account to fetch profile of.',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#profileViewDetailed',
          },
        },
      },
    },
  },
  AppBskyActorGetSuggestions: {
    lexicon: 1,
    id: 'app.bsky.actor.getSuggestions',
    defs: {
      main: {
        type: 'query',
        description:
          'Get a list of suggested actors. Expected use is discovery of accounts to follow during new account onboarding.',
        parameters: {
          type: 'params',
          properties: {
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['actors'],
            properties: {
              cursor: {
                type: 'string',
              },
              actors: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.actor.defs#profileView',
                },
              },
            },
          },
        },
      },
    },
  },
  AppBskyActorSearchActors: {
    lexicon: 1,
    id: 'app.bsky.actor.searchActors',
    defs: {
      main: {
        type: 'query',
        description:
          'Find actors (profiles) matching search criteria. Does not require auth.',
        parameters: {
          type: 'params',
          properties: {
            term: {
              type: 'string',
              description: "DEPRECATED: use 'q' instead.",
            },
            q: {
              type: 'string',
              description:
                'Search query string. Syntax, phrase, boolean, and faceting is unspecified, but Lucene query syntax is recommended.',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 25,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['actors'],
            properties: {
              cursor: {
                type: 'string',
              },
              actors: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.actor.defs#profileView',
                },
              },
            },
          },
        },
      },
    },
  },
  AppBskyActorGetProfiles: {
    lexicon: 1,
    id: 'app.bsky.actor.getProfiles',
    defs: {
      main: {
        type: 'query',
        description: 'Get detailed profile views of multiple actors.',
        parameters: {
          type: 'params',
          required: ['actors'],
          properties: {
            actors: {
              type: 'array',
              items: {
                type: 'string',
                format: 'at-identifier',
              },
              maxLength: 25,
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['profiles'],
            properties: {
              profiles: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.bsky.actor.defs#profileViewDetailed',
                },
              },
            },
          },
        },
      },
    },
  },
  AppBskyActorGetPreferences: {
    lexicon: 1,
    id: 'app.bsky.actor.getPreferences',
    defs: {
      main: {
        type: 'query',
        description:
          'Get private preferences attached to the current account. Expected use is synchronization between multiple devices, and import/export during account migration. Requires auth.',
        parameters: {
          type: 'params',
          properties: {},
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['preferences'],
            properties: {
              preferences: {
                type: 'ref',
                ref: 'lex:app.bsky.actor.defs#preferences',
              },
            },
          },
        },
      },
    },
  },
  AppBskyActorProfile: {
    lexicon: 1,
    id: 'app.bsky.actor.profile',
    defs: {
      main: {
        type: 'record',
        description: 'A declaration of a Bluesky account profile.',
        key: 'literal:self',
        record: {
          type: 'object',
          properties: {
            displayName: {
              type: 'string',
              maxGraphemes: 64,
              maxLength: 640,
            },
            description: {
              type: 'string',
              description: 'Free-form profile description text.',
              maxGraphemes: 256,
              maxLength: 2560,
            },
            avatar: {
              type: 'blob',
              description:
                "Small image to be displayed next to posts from account. AKA, 'profile picture'",
              accept: ['image/png', 'image/jpeg'],
              maxSize: 1000000,
            },
            banner: {
              type: 'blob',
              description:
                'Larger horizontal image to display behind profile view.',
              accept: ['image/png', 'image/jpeg'],
              maxSize: 1000000,
            },
            labels: {
              type: 'union',
              description:
                'Self-label values, specific to the Bluesky application, on the overall account.',
              refs: ['lex:com.atproto.label.defs#selfLabels'],
            },
            joinedViaStarterPack: {
              type: 'ref',
              ref: 'lex:com.atproto.repo.strongRef',
            },
            pinnedPost: {
              type: 'ref',
              ref: 'lex:com.atproto.repo.strongRef',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
          },
        },
      },
    },
  },
  AppBskyLabelerDefs: {
    lexicon: 1,
    id: 'app.bsky.labeler.defs',
    defs: {
      labelerView: {
        type: 'object',
        required: ['uri', 'cid', 'creator', 'indexedAt'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
          creator: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#profileView',
          },
          likeCount: {
            type: 'integer',
            minimum: 0,
          },
          viewer: {
            type: 'ref',
            ref: 'lex:app.bsky.labeler.defs#labelerViewerState',
          },
          indexedAt: {
            type: 'string',
            format: 'datetime',
          },
          labels: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:com.atproto.label.defs#label',
            },
          },
        },
      },
      labelerViewDetailed: {
        type: 'object',
        required: ['uri', 'cid', 'creator', 'policies', 'indexedAt'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
          creator: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#profileView',
          },
          policies: {
            type: 'ref',
            ref: 'lex:app.bsky.labeler.defs#labelerPolicies',
          },
          likeCount: {
            type: 'integer',
            minimum: 0,
          },
          viewer: {
            type: 'ref',
            ref: 'lex:app.bsky.labeler.defs#labelerViewerState',
          },
          indexedAt: {
            type: 'string',
            format: 'datetime',
          },
          labels: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:com.atproto.label.defs#label',
            },
          },
        },
      },
      labelerViewerState: {
        type: 'object',
        properties: {
          like: {
            type: 'string',
            format: 'at-uri',
          },
        },
      },
      labelerPolicies: {
        type: 'object',
        required: ['labelValues'],
        properties: {
          labelValues: {
            type: 'array',
            description:
              'The label values which this labeler publishes. May include global or custom labels.',
            items: {
              type: 'ref',
              ref: 'lex:com.atproto.label.defs#labelValue',
            },
          },
          labelValueDefinitions: {
            type: 'array',
            description:
              'Label values created by this labeler and scoped exclusively to it. Labels defined here will override global label definitions for this labeler.',
            items: {
              type: 'ref',
              ref: 'lex:com.atproto.label.defs#labelValueDefinition',
            },
          },
        },
      },
    },
  },
  AppBskyLabelerService: {
    lexicon: 1,
    id: 'app.bsky.labeler.service',
    defs: {
      main: {
        type: 'record',
        description: 'A declaration of the existence of labeler service.',
        key: 'literal:self',
        record: {
          type: 'object',
          required: ['policies', 'createdAt'],
          properties: {
            policies: {
              type: 'ref',
              ref: 'lex:app.bsky.labeler.defs#labelerPolicies',
            },
            labels: {
              type: 'union',
              refs: ['lex:com.atproto.label.defs#selfLabels'],
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
          },
        },
      },
    },
  },
  AppBskyLabelerGetServices: {
    lexicon: 1,
    id: 'app.bsky.labeler.getServices',
    defs: {
      main: {
        type: 'query',
        description: 'Get information about a list of labeler services.',
        parameters: {
          type: 'params',
          required: ['dids'],
          properties: {
            dids: {
              type: 'array',
              items: {
                type: 'string',
                format: 'did',
              },
            },
            detailed: {
              type: 'boolean',
              default: false,
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['views'],
            properties: {
              views: {
                type: 'array',
                items: {
                  type: 'union',
                  refs: [
                    'lex:app.bsky.labeler.defs#labelerView',
                    'lex:app.bsky.labeler.defs#labelerViewDetailed',
                  ],
                },
              },
            },
          },
        },
      },
    },
  },
  BlueMarilStellarGetActorReactions: {
    lexicon: 1,
    id: 'blue.maril.stellar.getActorReactions',
    defs: {
      main: {
        type: 'query',
        description:
          'Get a list of posts reaction by an actor. Requires auth, actor must be the requesting account.',
        parameters: {
          type: 'params',
          required: ['actor'],
          properties: {
            actor: {
              type: 'string',
              format: 'at-identifier',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['feed'],
            properties: {
              cursor: {
                type: 'string',
              },
              feed: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:blue.maril.stellar.getActorReactions#actorReaction',
                },
              },
            },
          },
        },
      },
      actorReaction: {
        type: 'object',
        required: ['post'],
        properties: {
          post: {
            type: 'ref',
            ref: 'lex:app.bsky.feed.defs#postView',
          },
          reply: {
            type: 'ref',
            ref: 'lex:app.bsky.feed.defs#replyRef',
          },
          reason: {
            type: 'union',
            refs: [
              'lex:app.bsky.feed.defs#reasonRepost',
              'lex:app.bsky.feed.defs#reasonPin',
            ],
          },
          reaction: {
            type: 'ref',
            ref: 'lex:blue.maril.stellar.getReactions#reaction',
          },
        },
      },
    },
  },
  BlueMarilStellarGetReactions: {
    lexicon: 1,
    id: 'blue.maril.stellar.getReactions',
    defs: {
      main: {
        type: 'query',
        description:
          'Get reaction records which reference a subject (by AT-URI and CID).',
        parameters: {
          type: 'params',
          required: ['uri'],
          properties: {
            uri: {
              type: 'string',
              format: 'at-uri',
              description: 'AT-URI of the subject (eg, a post record).',
            },
            cid: {
              type: 'string',
              format: 'cid',
              description:
                'CID of the subject record (aka, specific version of record), to filter reactions.',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['uri', 'reactions'],
            properties: {
              uri: {
                type: 'string',
                format: 'at-uri',
              },
              cid: {
                type: 'string',
                format: 'cid',
              },
              cursor: {
                type: 'string',
              },
              reactions: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:blue.maril.stellar.getReactions#reaction',
                },
              },
            },
          },
        },
      },
      reaction: {
        type: 'object',
        required: ['rkey', 'subject', 'createdAt', 'emoji', 'actor'],
        properties: {
          rkey: {
            type: 'string',
          },
          subject: {
            type: 'ref',
            ref: 'lex:com.atproto.repo.strongRef',
          },
          createdAt: {
            type: 'string',
            format: 'datetime',
          },
          emojiRef: {
            type: 'ref',
            ref: 'lex:blue.maril.stellar.reaction#emojiRef',
          },
          emoji: {
            type: 'ref',
            ref: 'lex:blue.moji.collection.item#itemView',
          },
          actor: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#profileView',
          },
        },
      },
    },
  },
  BlueMarilStellarReaction: {
    lexicon: 1,
    id: 'blue.maril.stellar.reaction',
    defs: {
      main: {
        type: 'record',
        description: 'Record declaring a emoji reaction of a subject content.',
        key: 'tid',
        record: {
          type: 'object',
          required: ['subject', 'emoji', 'authorDid'],
          properties: {
            subject: {
              type: 'ref',
              ref: 'lex:com.atproto.repo.strongRef',
            },
            emoji: {
              type: 'ref',
              ref: 'lex:blue.maril.stellar.reaction#emojiRef',
            },
            authorDid: {
              type: 'string',
              format: 'at-identifier',
            },
          },
        },
      },
      emojiRef: {
        type: 'object',
        required: ['rkey', 'repo'],
        properties: {
          rkey: {
            type: 'string',
          },
          repo: {
            type: 'string',
            format: 'did',
          },
        },
      },
    },
  },
  BlueMojiCollectionItem: {
    lexicon: 1,
    id: 'blue.moji.collection.item',
    defs: {
      main: {
        type: 'record',
        description: 'A custom emoji',
        key: 'any',
        record: {
          type: 'object',
          required: ['name', 'createdAt', 'formats'],
          properties: {
            name: {
              type: 'string',
              description: 'Should be in the format :emoji:',
            },
            alt: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
            formats: {
              type: 'union',
              description: 'Open union to allow for future formats',
              refs: ['lex:blue.moji.collection.item#formats_v0'],
              closed: false,
            },
            adultOnly: {
              type: 'boolean',
              default: false,
            },
            labels: {
              type: 'union',
              description:
                'Self-label values for this emoji. Effectively content warnings.',
              refs: ['lex:com.atproto.label.defs#selfLabels'],
            },
            copyOf: {
              type: 'string',
              format: 'at-uri',
            },
            fallbackText: {
              type: 'string',
              maxLength: 1,
              default: '◌',
            },
          },
        },
      },
      formats_v0: {
        type: 'object',
        properties: {
          original: {
            type: 'blob',
            accept: ['image/*', 'application/lottie+zip'],
            maxSize: 1000000,
          },
          png_128: {
            type: 'ref',
            ref: 'lex:blue.moji.collection.item#blob_v0',
          },
          apng_128: {
            type: 'ref',
            ref: 'lex:blue.moji.collection.item#bytes_v0',
          },
          gif_128: {
            type: 'ref',
            ref: 'lex:blue.moji.collection.item#blob_v0',
          },
          webp_128: {
            type: 'ref',
            ref: 'lex:blue.moji.collection.item#blob_v0',
          },
          lottie: {
            type: 'ref',
            ref: 'lex:blue.moji.collection.item#bytes_v0',
          },
        },
      },
      blob_v0: {
        type: 'blob',
        maxSize: 262144,
        description:
          'Limiting blobs to 256kb because there may be many on page and these get optimised by ImgProxy anyway',
      },
      bytes_v0: {
        type: 'bytes',
        maxLength: 65536,
        description: '64kb should be enough for anybody',
      },
      itemView: {
        type: 'object',
        required: ['name', 'formats'],
        properties: {
          name: {
            type: 'string',
          },
          alt: {
            type: 'string',
          },
          createdAt: {
            type: 'string',
            format: 'datetime',
          },
          formats: {
            type: 'ref',
            ref: 'lex:blue.moji.collection.item#formats_v0',
          },
          adultOnly: {
            type: 'boolean',
            default: false,
          },
        },
      },
    },
  },
  BlueMojiCollectionListCollection: {
    lexicon: 1,
    id: 'blue.moji.collection.listCollection',
    defs: {
      main: {
        type: 'query',
        description:
          'List a range of Bluemoji in a repository, matching a specific collection. Requires auth.',
        parameters: {
          type: 'params',
          properties: {
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
              description: 'The number of records to return.',
            },
            cursor: {
              type: 'string',
            },
            reverse: {
              type: 'boolean',
              description: 'Flag to reverse the order of the returned records.',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['items'],
            properties: {
              cursor: {
                type: 'string',
              },
              items: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:blue.moji.collection.item#itemView',
                },
              },
            },
          },
        },
      },
      itemView: {
        type: 'object',
        required: ['uri', 'record'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          record: {
            type: 'ref',
            ref: 'lex:blue.moji.collection.item#itemView',
          },
        },
      },
    },
  },
  BlueMojiCollectionDefs: {
    lexicon: 1,
    id: 'blue.moji.collection.defs',
    defs: {
      collectionView: {
        type: 'object',
        required: ['uri', 'cid', 'creator', 'name', 'indexedAt'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
          creator: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#profileView',
          },
          name: {
            type: 'string',
            maxLength: 64,
            minLength: 1,
          },
          description: {
            type: 'string',
            maxGraphemes: 300,
            maxLength: 3000,
          },
          descriptionFacets: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:app.bsky.richtext.facet',
            },
          },
          avatar: {
            type: 'string',
            format: 'uri',
          },
          collectionItemCount: {
            type: 'integer',
            minimum: 0,
          },
          labels: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:com.atproto.label.defs#label',
            },
          },
          indexedAt: {
            type: 'string',
            format: 'datetime',
          },
        },
      },
    },
  },
  BlueMojiCollectionPutItem: {
    lexicon: 1,
    id: 'blue.moji.collection.putItem',
    defs: {
      main: {
        type: 'procedure',
        description:
          'Write a Bluemoji record, creating or updating it as needed. Requires auth, implemented by AppView.',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['repo', 'item'],
            properties: {
              repo: {
                type: 'string',
                format: 'at-identifier',
                description:
                  'The handle or DID of the repo (aka, current account).',
              },
              validate: {
                type: 'boolean',
                default: true,
                description:
                  "Can be set to 'false' to skip Lexicon schema validation of record data.",
              },
              item: {
                type: 'ref',
                ref: 'lex:blue.moji.collection.item#itemView',
              },
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['uri'],
            properties: {
              uri: {
                type: 'string',
                format: 'at-uri',
              },
            },
          },
        },
        errors: [],
      },
    },
  },
  BlueMojiCollectionGetItem: {
    lexicon: 1,
    id: 'blue.moji.collection.getItem',
    defs: {
      main: {
        type: 'query',
        description: 'Get a single emoji from a repository. Requires auth.',
        parameters: {
          type: 'params',
          required: ['repo', 'name'],
          properties: {
            repo: {
              type: 'string',
              format: 'at-identifier',
              description: 'The handle or DID of the repo.',
            },
            name: {
              type: 'string',
              description: 'The Bluemoji alias/rkey.',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['uri', 'item'],
            properties: {
              uri: {
                type: 'string',
                format: 'at-uri',
              },
              item: {
                type: 'ref',
                ref: 'lex:blue.moji.collection.item#itemView',
              },
            },
          },
        },
      },
    },
  },
  BlueMojiCollectionSaveToCollection: {
    lexicon: 1,
    id: 'blue.moji.collection.saveToCollection',
    defs: {
      main: {
        type: 'procedure',
        description: 'Copy a single emoji from another repo. Requires auth.',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['source', 'name'],
            properties: {
              source: {
                type: 'string',
                format: 'at-identifier',
                description: 'The handle or DID of the repo to copy from.',
              },
              name: {
                type: 'string',
                description: 'The source Bluemoji name/rkey.',
                maxLength: 15,
              },
              renameTo: {
                type: 'string',
                description:
                  "The alias to save the Bluemoji to in the current logged-in user's repo.",
              },
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['uri', 'item'],
            properties: {
              uri: {
                type: 'string',
                format: 'at-uri',
              },
              item: {
                type: 'ref',
                ref: 'lex:blue.moji.collection.item#itemView',
              },
            },
          },
        },
        errors: [
          {
            name: 'EmojiNotFound',
            description:
              'Indicates the named Bluemoji was not found in the source repo.',
          },
          {
            name: 'DestinationExists',
            description:
              'Indicates another Bluemoji with the same name already exists in the source repo. Set renameTo to rename.',
          },
        ],
      },
    },
  },
  BlueMojiPacksPack: {
    lexicon: 1,
    id: 'blue.moji.packs.pack',
    defs: {
      main: {
        type: 'record',
        description: 'A shareable Bluemoji pack',
        key: 'tid',
        record: {
          type: 'object',
          required: ['name', 'createdAt'],
          properties: {
            name: {
              type: 'string',
              maxLength: 64,
              minLength: 1,
            },
            description: {
              type: 'string',
              maxGraphemes: 300,
              maxLength: 3000,
            },
            descriptionFacets: {
              type: 'array',
              items: {
                type: 'ref',
                ref: 'lex:blue.moji.richtext.facet',
              },
            },
            icon: {
              type: 'blob',
              accept: ['image/png', 'image/jpeg'],
              maxSize: 1000000,
            },
            adultOnly: {
              type: 'boolean',
              default: false,
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
            labels: {
              type: 'union',
              description:
                'Self-label values for this emoji. Effectively content warnings.',
              refs: ['lex:com.atproto.label.defs#selfLabels'],
            },
          },
        },
      },
    },
  },
  BlueMojiPacksDefs: {
    lexicon: 1,
    id: 'blue.moji.packs.defs',
    defs: {
      packViewBasic: {
        type: 'object',
        required: ['uri', 'cid', 'name'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
          name: {
            type: 'string',
            maxLength: 64,
            minLength: 1,
          },
          description: {
            type: 'string',
            maxGraphemes: 300,
            maxLength: 3000,
          },
          descriptionFacets: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:blue.moji.richtext.facet',
            },
          },
          avatar: {
            type: 'string',
            format: 'uri',
          },
          itemCount: {
            type: 'integer',
            minimum: 0,
          },
          labels: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:com.atproto.label.defs#label',
            },
          },
          viewer: {
            type: 'ref',
            ref: 'lex:blue.moji.packs.defs#packViewerState',
          },
          indexedAt: {
            type: 'string',
            format: 'datetime',
          },
        },
      },
      packView: {
        type: 'object',
        required: ['uri', 'cid', 'creator', 'name', 'indexedAt'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
          creator: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#profileView',
          },
          name: {
            type: 'string',
            maxLength: 64,
            minLength: 1,
          },
          description: {
            type: 'string',
            maxGraphemes: 300,
            maxLength: 3000,
          },
          descriptionFacets: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:app.bsky.richtext.facet',
            },
          },
          avatar: {
            type: 'string',
            format: 'uri',
          },
          packItemCount: {
            type: 'integer',
            minimum: 0,
          },
          labels: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:com.atproto.label.defs#label',
            },
          },
          viewer: {
            type: 'ref',
            ref: 'lex:blue.moji.packs.defs#packViewerState',
          },
          indexedAt: {
            type: 'string',
            format: 'datetime',
          },
        },
      },
      packItemView: {
        type: 'object',
        required: ['uri', 'subject'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          subject: {
            type: 'ref',
            ref: 'lex:blue.moji.collection.item#itemView',
          },
        },
      },
      packViewerState: {
        type: 'object',
        properties: {
          savedToCollection: {
            type: 'boolean',
          },
        },
      },
    },
  },
  BlueMojiPacksPackitem: {
    lexicon: 1,
    id: 'blue.moji.packs.packitem',
    defs: {
      main: {
        type: 'record',
        description:
          "Record representing a Bluemoji's inclusion in a specific pack. The AppView will ignore duplicate item records.",
        key: 'tid',
        record: {
          type: 'object',
          required: ['subject', 'pack', 'createdAt'],
          properties: {
            subject: {
              type: 'string',
              format: 'at-uri',
              description:
                'Reference (AT-URI) to the Bluemoji item record (blue.moji.collection.item).',
            },
            pack: {
              type: 'string',
              format: 'at-uri',
              description:
                'Reference (AT-URI) to the pack record (blue.moji.packs.pack).',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
          },
        },
      },
    },
  },
  BlueMojiPacksGetPack: {
    lexicon: 1,
    id: 'blue.moji.packs.getPack',
    defs: {
      main: {
        type: 'query',
        description:
          "Gets a 'view' (with additional context) of a specified pack.",
        parameters: {
          type: 'params',
          required: ['pack'],
          properties: {
            pack: {
              type: 'string',
              format: 'at-uri',
              description: 'Reference (AT-URI) of the pack record to hydrate.',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['pack', 'items'],
            properties: {
              cursor: {
                type: 'string',
              },
              pack: {
                type: 'ref',
                ref: 'lex:blue.moji.packs.defs#packView',
              },
              items: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:blue.moji.packs.defs#packItemView',
                },
              },
            },
          },
        },
      },
    },
  },
  BlueMojiPacksGetActorPacks: {
    lexicon: 1,
    id: 'blue.moji.packs.getActorPacks',
    defs: {
      main: {
        type: 'query',
        description: 'Get a list of Bluemoji packs created by the actor.',
        parameters: {
          type: 'params',
          required: ['actor'],
          properties: {
            actor: {
              type: 'string',
              format: 'at-identifier',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['packs'],
            properties: {
              cursor: {
                type: 'string',
              },
              packs: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:blue.moji.packs.defs#packViewBasic',
                },
              },
            },
          },
        },
      },
    },
  },
  BlueMojiPacksGetPacks: {
    lexicon: 1,
    id: 'blue.moji.packs.getPacks',
    defs: {
      main: {
        type: 'query',
        description: 'Get views for a list of Bluemoji packs.',
        parameters: {
          type: 'params',
          required: ['uris'],
          properties: {
            uris: {
              type: 'array',
              items: {
                type: 'string',
                format: 'at-uri',
              },
              maxLength: 25,
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['packs'],
            properties: {
              packs: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:blue.moji.packs.defs#packViewBasic',
                },
              },
            },
          },
        },
      },
    },
  },
  BlueMojiRichtextFacet: {
    lexicon: 1,
    id: 'blue.moji.richtext.facet',
    defs: {
      main: {
        type: 'object',
        required: ['did', 'name', 'formats'],
        properties: {
          did: {
            type: 'string',
            description: 'DID of the user posting the Bluemoji',
          },
          name: {
            type: 'string',
            description: 'Name of the Bluemoji in :emoji: format',
          },
          alt: {
            type: 'string',
          },
          adultOnly: {
            type: 'boolean',
            default: false,
          },
          labels: {
            type: 'union',
            description:
              'Self-label values for this emoji. Effectively content warnings.',
            refs: ['lex:com.atproto.label.defs#selfLabels'],
          },
          formats: {
            type: 'union',
            refs: ['lex:blue.moji.richtext.facet#formats_v0'],
            closed: false,
          },
        },
      },
      formats_v0: {
        type: 'object',
        description:
          'On the facet, only the CID is provided as this can be combined with the DID to create CDN URLs for non-animated blobs. For APNG and dotLottie, raw Bytes are served and require a com.atproto.repo.getRecord roundtrip on render so are marked with a boolean',
        properties: {
          png_128: {
            type: 'string',
            format: 'cid',
          },
          webp_128: {
            type: 'string',
            format: 'cid',
          },
          gif_128: {
            type: 'string',
            format: 'cid',
          },
          apng_128: {
            type: 'boolean',
            default: false,
          },
          lottie: {
            type: 'boolean',
            default: false,
          },
        },
      },
    },
  },
  ComAtprotoRepoStrongRef: {
    lexicon: 1,
    id: 'com.atproto.repo.strongRef',
    description: 'A URI with a content-hash fingerprint.',
    defs: {
      main: {
        type: 'object',
        required: ['uri', 'cid'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
        },
      },
    },
  },
} as const satisfies Record<string, LexiconDoc>

export const schemas = Object.values(schemaDict)
export const lexicons: Lexicons = new Lexicons(schemas)
export const ids = {
  AppBskyVideoUploadVideo: 'app.bsky.video.uploadVideo',
  AppBskyVideoDefs: 'app.bsky.video.defs',
  AppBskyVideoGetJobStatus: 'app.bsky.video.getJobStatus',
  AppBskyVideoGetUploadLimits: 'app.bsky.video.getUploadLimits',
  AppBskyEmbedDefs: 'app.bsky.embed.defs',
  AppBskyEmbedRecord: 'app.bsky.embed.record',
  AppBskyEmbedImages: 'app.bsky.embed.images',
  AppBskyEmbedRecordWithMedia: 'app.bsky.embed.recordWithMedia',
  AppBskyEmbedVideo: 'app.bsky.embed.video',
  AppBskyEmbedExternal: 'app.bsky.embed.external',
  AppBskyNotificationRegisterPush: 'app.bsky.notification.registerPush',
  AppBskyNotificationPutPreferences: 'app.bsky.notification.putPreferences',
  AppBskyNotificationUpdateSeen: 'app.bsky.notification.updateSeen',
  AppBskyNotificationListNotifications:
    'app.bsky.notification.listNotifications',
  AppBskyNotificationGetUnreadCount: 'app.bsky.notification.getUnreadCount',
  AppBskyUnspeccedSearchStarterPacksSkeleton:
    'app.bsky.unspecced.searchStarterPacksSkeleton',
  AppBskyUnspeccedDefs: 'app.bsky.unspecced.defs',
  AppBskyUnspeccedSearchActorsSkeleton:
    'app.bsky.unspecced.searchActorsSkeleton',
  AppBskyUnspeccedGetSuggestionsSkeleton:
    'app.bsky.unspecced.getSuggestionsSkeleton',
  AppBskyUnspeccedSearchPostsSkeleton: 'app.bsky.unspecced.searchPostsSkeleton',
  AppBskyUnspeccedGetPopularFeedGenerators:
    'app.bsky.unspecced.getPopularFeedGenerators',
  AppBskyUnspeccedGetTaggedSuggestions:
    'app.bsky.unspecced.getTaggedSuggestions',
  AppBskyUnspeccedGetConfig: 'app.bsky.unspecced.getConfig',
  AppBskyGraphGetStarterPacks: 'app.bsky.graph.getStarterPacks',
  AppBskyGraphGetSuggestedFollowsByActor:
    'app.bsky.graph.getSuggestedFollowsByActor',
  AppBskyGraphBlock: 'app.bsky.graph.block',
  AppBskyGraphFollow: 'app.bsky.graph.follow',
  AppBskyGraphDefs: 'app.bsky.graph.defs',
  AppBskyGraphUnmuteActorList: 'app.bsky.graph.unmuteActorList',
  AppBskyGraphGetListBlocks: 'app.bsky.graph.getListBlocks',
  AppBskyGraphListblock: 'app.bsky.graph.listblock',
  AppBskyGraphGetStarterPack: 'app.bsky.graph.getStarterPack',
  AppBskyGraphStarterpack: 'app.bsky.graph.starterpack',
  AppBskyGraphMuteActorList: 'app.bsky.graph.muteActorList',
  AppBskyGraphMuteThread: 'app.bsky.graph.muteThread',
  AppBskyGraphSearchStarterPacks: 'app.bsky.graph.searchStarterPacks',
  AppBskyGraphGetActorStarterPacks: 'app.bsky.graph.getActorStarterPacks',
  AppBskyGraphGetLists: 'app.bsky.graph.getLists',
  AppBskyGraphGetFollowers: 'app.bsky.graph.getFollowers',
  AppBskyGraphUnmuteThread: 'app.bsky.graph.unmuteThread',
  AppBskyGraphMuteActor: 'app.bsky.graph.muteActor',
  AppBskyGraphGetMutes: 'app.bsky.graph.getMutes',
  AppBskyGraphListitem: 'app.bsky.graph.listitem',
  AppBskyGraphList: 'app.bsky.graph.list',
  AppBskyGraphGetKnownFollowers: 'app.bsky.graph.getKnownFollowers',
  AppBskyGraphGetListMutes: 'app.bsky.graph.getListMutes',
  AppBskyGraphGetFollows: 'app.bsky.graph.getFollows',
  AppBskyGraphGetBlocks: 'app.bsky.graph.getBlocks',
  AppBskyGraphGetRelationships: 'app.bsky.graph.getRelationships',
  AppBskyGraphUnmuteActor: 'app.bsky.graph.unmuteActor',
  AppBskyGraphGetList: 'app.bsky.graph.getList',
  AppBskyFeedGenerator: 'app.bsky.feed.generator',
  AppBskyFeedSendInteractions: 'app.bsky.feed.sendInteractions',
  AppBskyFeedDefs: 'app.bsky.feed.defs',
  AppBskyFeedGetFeedGenerators: 'app.bsky.feed.getFeedGenerators',
  AppBskyFeedGetTimeline: 'app.bsky.feed.getTimeline',
  AppBskyFeedGetFeedGenerator: 'app.bsky.feed.getFeedGenerator',
  AppBskyFeedGetAuthorFeed: 'app.bsky.feed.getAuthorFeed',
  AppBskyFeedGetLikes: 'app.bsky.feed.getLikes',
  AppBskyFeedPostgate: 'app.bsky.feed.postgate',
  AppBskyFeedThreadgate: 'app.bsky.feed.threadgate',
  AppBskyFeedGetPostThread: 'app.bsky.feed.getPostThread',
  AppBskyFeedGetActorLikes: 'app.bsky.feed.getActorLikes',
  AppBskyFeedLike: 'app.bsky.feed.like',
  AppBskyFeedGetRepostedBy: 'app.bsky.feed.getRepostedBy',
  AppBskyFeedRepost: 'app.bsky.feed.repost',
  AppBskyFeedDescribeFeedGenerator: 'app.bsky.feed.describeFeedGenerator',
  AppBskyFeedSearchPosts: 'app.bsky.feed.searchPosts',
  AppBskyFeedGetPosts: 'app.bsky.feed.getPosts',
  AppBskyFeedGetFeed: 'app.bsky.feed.getFeed',
  AppBskyFeedGetQuotes: 'app.bsky.feed.getQuotes',
  AppBskyFeedGetFeedSkeleton: 'app.bsky.feed.getFeedSkeleton',
  AppBskyFeedGetListFeed: 'app.bsky.feed.getListFeed',
  AppBskyFeedGetSuggestedFeeds: 'app.bsky.feed.getSuggestedFeeds',
  AppBskyFeedGetActorFeeds: 'app.bsky.feed.getActorFeeds',
  AppBskyFeedPost: 'app.bsky.feed.post',
  AppBskyRichtextFacet: 'app.bsky.richtext.facet',
  AppBskyActorSearchActorsTypeahead: 'app.bsky.actor.searchActorsTypeahead',
  AppBskyActorDefs: 'app.bsky.actor.defs',
  AppBskyActorPutPreferences: 'app.bsky.actor.putPreferences',
  AppBskyActorGetProfile: 'app.bsky.actor.getProfile',
  AppBskyActorGetSuggestions: 'app.bsky.actor.getSuggestions',
  AppBskyActorSearchActors: 'app.bsky.actor.searchActors',
  AppBskyActorGetProfiles: 'app.bsky.actor.getProfiles',
  AppBskyActorGetPreferences: 'app.bsky.actor.getPreferences',
  AppBskyActorProfile: 'app.bsky.actor.profile',
  AppBskyLabelerDefs: 'app.bsky.labeler.defs',
  AppBskyLabelerService: 'app.bsky.labeler.service',
  AppBskyLabelerGetServices: 'app.bsky.labeler.getServices',
  BlueMarilStellarGetActorReactions: 'blue.maril.stellar.getActorReactions',
  BlueMarilStellarGetReactions: 'blue.maril.stellar.getReactions',
  BlueMarilStellarReaction: 'blue.maril.stellar.reaction',
  BlueMojiCollectionItem: 'blue.moji.collection.item',
  BlueMojiCollectionListCollection: 'blue.moji.collection.listCollection',
  BlueMojiCollectionDefs: 'blue.moji.collection.defs',
  BlueMojiCollectionPutItem: 'blue.moji.collection.putItem',
  BlueMojiCollectionGetItem: 'blue.moji.collection.getItem',
  BlueMojiCollectionSaveToCollection: 'blue.moji.collection.saveToCollection',
  BlueMojiPacksPack: 'blue.moji.packs.pack',
  BlueMojiPacksDefs: 'blue.moji.packs.defs',
  BlueMojiPacksPackitem: 'blue.moji.packs.packitem',
  BlueMojiPacksGetPack: 'blue.moji.packs.getPack',
  BlueMojiPacksGetActorPacks: 'blue.moji.packs.getActorPacks',
  BlueMojiPacksGetPacks: 'blue.moji.packs.getPacks',
  BlueMojiRichtextFacet: 'blue.moji.richtext.facet',
  ComAtprotoRepoStrongRef: 'com.atproto.repo.strongRef',
}
