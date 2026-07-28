package com.streamversex.backend.externalapi.anilist.client;

import java.time.LocalDate;
import java.util.Map;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.streamversex.backend.externalapi.anilist.dto.AniListMediaResponseDTO;
import com.streamversex.backend.externalapi.anilist.dto.AniListResponseDTO;

@Component
public class AniListClient {

    private final RestClient restClient;

    public AniListClient(
            @Qualifier("aniListRestClient") RestClient restClient) {

        this.restClient = restClient;
    }

    // ==================== TRENDING ====================

    public AniListResponseDTO getTrendingAnime() {

        return getAnimeBySort("TRENDING_DESC");
    }


    // ==================== POPULAR ====================

    public AniListResponseDTO getPopularAnime() {

        return getAnimeBySort("POPULARITY_DESC");
    }


    // ==================== TOP RATED ====================

    public AniListResponseDTO getTopRatedAnime() {

        return getAnimeBySort("SCORE_DESC");
    }


    // ==================== COMMON QUERY ====================

    private AniListResponseDTO getAnimeBySort(String sort) {

        String query = """
                query ($sort: [MediaSort]) {

                    Page(page: 1, perPage: 20) {

                        media(
                            type: ANIME,
                            sort: $sort
                        ) {

                            id

                            title {
                                romaji
                                english
                                native
                            }

                            description

                            format
                            status

                            episodes
                            duration

                            averageScore
                            meanScore

                            popularity
                            favourites

                            season
                            seasonYear

                            genres

                            coverImage {
                                extraLarge
                                large
                                medium
                            }

                            bannerImage
                            siteUrl
                        }
                    }
                }
                """;

        Map<String, Object> variables =
                Map.of("sort", sort);

        return executeQuery(query, variables);
    }
    
 // ==================== SEASONAL ====================

    public AniListResponseDTO getSeasonalAnime(
            String season,
            Integer year) {

        String query = """
                query ($season: MediaSeason, $year: Int) {

                    Page(page: 1, perPage: 20) {

                        media(
                            type: ANIME,
                            season: $season,
                            seasonYear: $year,
                            sort: POPULARITY_DESC
                        ) {

                            id

                            title {
                                romaji
                                english
                                native
                            }

                            description
                            format
                            status
                            episodes
                            duration
                            averageScore
                            meanScore
                            popularity
                            favourites
                            season
                            seasonYear
                            genres

                            coverImage {
                                extraLarge
                                large
                                medium
                            }

                            bannerImage
                            siteUrl
                        }
                    }
                }
                """;

        Map<String, Object> variables =
                Map.of(
                        "season", season.toUpperCase(),
                        "year", year
                );

        return executeQuery(query, variables);
    }
    
    
 // ==================== UPCOMING ====================

    public AniListResponseDTO getUpcomingAnime() {

        LocalDate today = LocalDate.now();

        int date =
                today.getYear() * 10000
                + today.getMonthValue() * 100
                + today.getDayOfMonth();

        String query = """
                query ($date: FuzzyDateInt) {

                    Page(page: 1, perPage: 20) {

                        media(
                            type: ANIME,
                            startDate_greater: $date,
                            sort: START_DATE
                        ) {

                            id

                            title {
                                romaji
                                english
                                native
                            }

                            description
                            format
                            status
                            episodes
                            duration
                            averageScore
                            meanScore
                            popularity
                            favourites
                            season
                            seasonYear
                            genres

                            coverImage {
                                extraLarge
                                large
                                medium
                            }

                            bannerImage
                            siteUrl
                        }
                    }
                }
                """;

        return executeQuery(
                query,
                Map.of("date", date)
        );
    }
    
 // ==================== SEARCH ====================

    public AniListResponseDTO searchAnime(String search) {

        String query = """
                query ($search: String) {

                    Page(page: 1, perPage: 20) {

                        media(
                            type: ANIME,
                            search: $search,
                            sort: SEARCH_MATCH
                        ) {

                            id

                            title {
                                romaji
                                english
                                native
                            }

                            description
                            format
                            status
                            episodes
                            duration
                            averageScore
                            meanScore
                            popularity
                            favourites
                            season
                            seasonYear
                            genres

                            coverImage {
                                extraLarge
                                large
                                medium
                            }

                            bannerImage
                            siteUrl
                        }
                    }
                }
                """;

        return executeQuery(
                query,
                Map.of("search", search)
        );
    }
    
 // ==================== ANIME DETAILS ====================

    public AniListMediaResponseDTO getAnimeDetails(Long animeId) {

        String query = """
                query ($id: Int) {

                    Media(
                        id: $id,
                        type: ANIME
                    ) {

                        id

                        title {
                            romaji
                            english
                            native
                        }

                        synonyms
                        description

                        format
                        status
                        source

                        episodes
                        duration

                        averageScore
                        meanScore
                        popularity
                        favourites

                        season
                        seasonYear

                        countryOfOrigin

                        genres

                        startDate {
                            year
                            month
                            day
                        }

                        endDate {
                            year
                            month
                            day
                        }

                        coverImage {
                            extraLarge
                            large
                            medium
                        }

                        bannerImage
                        siteUrl

                        studios {
                            nodes {
                                id
                                name
                                isAnimationStudio
                                siteUrl
                            }
                        }

                        trailer {
                            id
                            site
                            thumbnail
                        }
                    }
                }
                """;

        Map<String, Object> requestBody =
                Map.of(
                        "query", query,
                        "variables", Map.of("id", animeId)
                );

        return restClient.post()
                .body(requestBody)
                .retrieve()
                .body(AniListMediaResponseDTO.class);
    }
    
    
 // ==================== ANIME CHARACTERS ====================

    public AniListMediaResponseDTO getAnimeCharacters(Long animeId) {

        String query = """
                query ($id: Int) {

                    Media(
                        id: $id,
                        type: ANIME
                    ) {

                        id

                        characters(
                            sort: [ROLE, RELEVANCE, ID]
                            perPage: 25
                        ) {

                            edges {

                                role

                                node {
                                    id

                                    name {
                                        full
                                        native
                                    }

                                    image {
                                        large
                                        medium
                                    }

                                    siteUrl
                                }

                                voiceActors {

                                    id

                                    name {
                                        full
                                        native
                                    }

                                    image {
                                        large
                                        medium
                                    }

                                    languageV2
                                    siteUrl
                                }
                            }
                        }
                    }
                }
                """;

        Map<String, Object> requestBody =
                Map.of(
                        "query", query,
                        "variables", Map.of("id", animeId)
                );

        return restClient.post()
                .body(requestBody)
                .retrieve()
                .body(AniListMediaResponseDTO.class);
    }
    
    
 // ==================== ANIME RECOMMENDATIONS ====================

    public AniListMediaResponseDTO getAnimeRecommendations(
            Long animeId) {

        String query = """
                query ($id: Int) {

                    Media(
                        id: $id,
                        type: ANIME
                    ) {

                        id

                        recommendations(
                            sort: RATING_DESC,
                            perPage: 20
                        ) {

                            nodes {

                                rating

                                mediaRecommendation {

                                    id

                                    title {
                                        romaji
                                        english
                                        native
                                    }

                                    description
                                    format
                                    status
                                    episodes
                                    duration

                                    averageScore
                                    meanScore

                                    popularity
                                    favourites

                                    season
                                    seasonYear

                                    genres

                                    coverImage {
                                        extraLarge
                                        large
                                        medium
                                    }

                                    bannerImage
                                    siteUrl
                                }
                            }
                        }
                    }
                }
                """;

        Map<String, Object> requestBody =
                Map.of(
                        "query", query,
                        "variables", Map.of("id", animeId)
                );

        return restClient.post()
                .body(requestBody)
                .retrieve()
                .body(AniListMediaResponseDTO.class);
    }
    
 // ==================== EXECUTE GRAPHQL QUERY ====================

    private AniListResponseDTO executeQuery(
            String query,
            Map<String, Object> variables) {

        Map<String, Object> requestBody =
                Map.of(
                        "query", query,
                        "variables", variables
                );

        return restClient.post()
                .body(requestBody)
                .retrieve()
                .body(AniListResponseDTO.class);
    }
}