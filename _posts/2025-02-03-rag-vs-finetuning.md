---
layout: post
title: "RAG vs Fine-tuning: When to Use Which (and When Neither)"
date: 2025-02-03
tags: [RAG,intelligent-systems]
description: "A practical decision framework for choosing between Retrieval-Augmented Generation and fine-tuning;  built from real production experience."
---

Every team developing with LLMs hits the same fork in the road: do we fine-tune the model, or do we bolt on retrieval?

---

## What RAG actually does (and doesn't do)

Retrieval-Augmented Generation fetches relevant chunks from an external knowledge source and stuffs them into the LLM's context window at inference time. Think of it like giving the model an open-book exam ; the answer is in the room, the model just needs to find and use it.

![RAG Diagram]({{ 'images/RAG.png' | relative_url }})

*RAG Architecture: knowledge lives outside the model, injected at query time.*

**RAG is the right call when:**
- Our knowledge base changes frequently : product docs, policy updates, live data
- We need source attribution and want to cite where the answer came from
- We're working with proprietary documents the base model never saw
- Budget is tight : RAG avoids expensive GPU training runs

**RAG struggles when:**
- The answer requires synthesising across hundreds of chunks, context gets noisy
- Latency matters — retrieval adds round-trip overhead
- We want the model to *behave* differently, not just know more

---

## What fine-tuning actually does (and doesn't do)

Fine-tuning updates the model's weights using domain-specific examples. The model internalises patterns — tone, format, reasoning style — so it doesn't need to be told every time. Think of it like hiring an employee and training them for months vs. handing a contractor a brief each morning.

![fine-tune Diagram]({{ 'images/fine-tune.png' | relative_url }})


*Fine-tuning Architecture: behaviour is baked into the model itself.*

**Fine-tuning is the right call when:**
- We need consistent tone, persona, or output format across all responses
- The task is narrow and well-defined : classification, code generation in a specific style
- We have high-quality labelled examples (hundreds to thousands)
- Latency is critical : no retrieval step means faster responses

**Fine-tuning struggles when:**
- Our data changes : fine-tuned knowledge goes stale and retraining is expensive
- We have fewer than a few hundred quality examples, the model will overfit
- We need explainability,  *"why did it say that?"* becomes much harder to answer

---

## The decision matrix

We use this table as a quick gut-check before committing to either approach. It covers 80% of real-world scenarios:

| Scenario | Fine-tune? | RAG? | Example |
|---|---|---|---|
| Static domain knowledge | (OK) Fine-tune | ⚠️ RAG works | Domain-specific NLP |
| Proprietary / fresh docs |(NOK) Overkill | (OK) RAG | Internal wikis, PDFs |
| Factual Q&A over corpus | (NOK) Stale fast | (OK) RAG | Support bots |
| Tone / style / persona | (OK) Fine-tune | (NOK) Won't help | Brand voice AI |
| Latency-sensitive prod | (OK)Fine-tune | ⚠️ Overhead  | Real-time apps |
| Small training data | (NOK) Will overfit | (OK) RAG | Niche use cases |
| Regulatory compliance | ⚠️ Risky alone | ⚠️ Risky alone | Consider neither alone |

---

## When neither is the answer

We've seen teams spend months fine-tuning a model to return JSON, when simply adding *"respond only in valid JSON"* to the system prompt would have done the job. The discipline is knowing when to reach for infrastructure and when the answer is just better prompting craft.

**Specific cases where neither helps:**
- Hallucination caused by ambiguous user input :  fix the input, not the model
- Slow responses : likely an infrastructure or streaming issue, not a model issue
- Model "doesn't understand our domain" : often fixable with few-shot examples in context
- Regulated outputs with legal liability :  neither approach provides hard guarantees; consider guardrails + human review

---

## The hybrid: when we use both

In practice, the most robust production systems we've architected combine both. Fine-tune for behaviour and style consistency; use RAG for dynamic knowledge grounding. The fine-tuned model already knows *how* to respond, RAG just gives it the right material to work with.

| Fine-tune handles… | RAG handles… |
|---|---|
| Response format & structure | Current product knowledge |
| Brand tone & persona | User-specific context |
| Task-specific reasoning patterns | Source citations & traceability |

---

## Our decision framework in 3 questions

Before we touch a training pipeline or spin up a vector DB, we run through these three questions in order:

**1. Is this a knowledge problem or a behaviour problem?**

Knowledge → RAG first. Behaviour → fine-tuning first.

**2. How often does the knowledge change?**

Frequent changes → RAG (no retraining). Static domain → fine-tuning is viable.

**3. Can prompt engineering get us 80% there?**

If yes — ship it. Revisit RAG/fine-tuning only when we hit that ceiling.

---
