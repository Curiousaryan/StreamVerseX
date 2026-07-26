package com.streamversex.backend.externalapi.tmdb.client;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.streamversex.backend.externalapi.tmdb.dto.TmdbCreditsResponse;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbGenreListResponse;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbMovieDetailsDTO;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbMoviePageResponse;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbVideoResponse;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TmdbClient {

    @Qualifier("tmdbRestClient")
    private final RestClient restClient;


    // ==================== TRENDING ====================

    public TmdbMoviePageResponse getTrendingMovies() {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/trending/movie/week")
                        .queryParam("language", "en-US")
                        .build())
                .retrieve()
                .body(TmdbMoviePageResponse.class);
    }


    // ==================== POPULAR ====================

    public TmdbMoviePageResponse getPopularMovies() {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/popular")
                        .queryParam("language", "en-US")
                        .queryParam("page", 1)
                        .build())
                .retrieve()
                .body(TmdbMoviePageResponse.class);
    }


    // ==================== TOP RATED ====================

    public TmdbMoviePageResponse getTopRatedMovies() {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/top_rated")
                        .queryParam("language", "en-US")
                        .queryParam("page", 1)
                        .build())
                .retrieve()
                .body(TmdbMoviePageResponse.class);
    }


    // ==================== UPCOMING ====================

    public TmdbMoviePageResponse getUpcomingMovies() {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/upcoming")
                        .queryParam("language", "en-US")
                        .queryParam("page", 1)
                        .build())
                .retrieve()
                .body(TmdbMoviePageResponse.class);
    }


    // ==================== NOW PLAYING ====================

    public TmdbMoviePageResponse getNowPlayingMovies() {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/now_playing")
                        .queryParam("language", "en-US")
                        .queryParam("page", 1)
                        .build())
                .retrieve()
                .body(TmdbMoviePageResponse.class);
    }
    
 // ==================== MOVIE DETAILS ====================

    public TmdbMovieDetailsDTO getMovieDetails(Long movieId) {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/{movieId}")
                        .queryParam("language", "en-US")
                        .build(movieId))
                .retrieve()
                .body(TmdbMovieDetailsDTO.class);
    }
    
 // ==================== SEARCH MOVIES ====================

    public TmdbMoviePageResponse searchMovies(String query) {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search/movie")
                        .queryParam("query", query)
                        .queryParam("language", "en-US")
                        .queryParam("page", 1)
                        .queryParam("include_adult", false)
                        .build())
                .retrieve()
                .body(TmdbMoviePageResponse.class);
    }
    
 // ==================== MOVIE GENRES ====================

    public TmdbGenreListResponse getMovieGenres() {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/genre/movie/list")
                        .queryParam("language", "en-US")
                        .build())
                .retrieve()
                .body(TmdbGenreListResponse.class);
    }
    
 // ==================== MOVIE CREDITS ====================

    public TmdbCreditsResponse getMovieCredits(Long movieId) {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/{movieId}/credits")
                        .queryParam("language", "en-US")
                        .build(movieId))
                .retrieve()
                .body(TmdbCreditsResponse.class);
    }
    
 // ==================== MOVIE VIDEOS ====================

    public TmdbVideoResponse getMovieVideos(Long movieId) {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/{movieId}/videos")
                        .queryParam("language", "en-US")
                        .build(movieId))
                .retrieve()
                .body(TmdbVideoResponse.class);
    }
    
 // ==================== MOVIE RECOMMENDATIONS ====================

    public TmdbMoviePageResponse getMovieRecommendations(Long movieId) {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/{movieId}/recommendations")
                        .queryParam("language", "en-US")
                        .queryParam("page", 1)
                        .build(movieId))
                .retrieve()
                .body(TmdbMoviePageResponse.class);
    }
}