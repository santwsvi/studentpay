# syntax=docker/dockerfile:1
# ============================================================================
#  StudentPay · Backend (Quarkus 3 / Java 21) — build multi-stágio
#  O build roda em JDK 21 (target do projeto), evitando incompatibilidades
#  de toolchain de JDKs mais novos.
# ============================================================================

# ---------- Stage 1: build ----------
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml ./
COPY src ./src
# cache do ~/.m2 entre builds via BuildKit
RUN --mount=type=cache,target=/root/.m2 mvn -B -ntp -DskipTests clean package

# ---------- Stage 2: runtime ----------
FROM eclipse-temurin:21-jre
WORKDIR /app
# layout fast-jar do Quarkus (lib → app → quarkus → run.jar)
COPY --from=build /app/target/quarkus-app/lib/ ./lib/
COPY --from=build /app/target/quarkus-app/*.jar ./
COPY --from=build /app/target/quarkus-app/app/ ./app/
COPY --from=build /app/target/quarkus-app/quarkus/ ./quarkus/

EXPOSE 8080
ENV LANG=C.UTF-8
ENTRYPOINT ["java", "-jar", "quarkus-run.jar"]
